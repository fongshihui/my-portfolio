import os
import io
import json
import base64
import datetime
from dotenv import load_dotenv
from PIL import Image
import requests
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters,
)

# Load environment variables
load_dotenv()

TELEGRAM_BOT_TOKEN = (os.getenv("TELEGRAM_BOT_TOKEN") or "").strip()
ALLOWED_USER_ID = (os.getenv("ALLOWED_TELEGRAM_USER_ID") or "").strip()
GITHUB_TOKEN = (os.getenv("GITHUB_TOKEN") or "").strip()
GITHUB_REPO_OWNER = (os.getenv("GITHUB_REPO_OWNER", "fongshihui") or "").strip()
GITHUB_REPO_NAME = (os.getenv("GITHUB_REPO_NAME", "my-portfolio") or "").strip()
GITHUB_BRANCH = (os.getenv("GITHUB_BRANCH", "master") or "").strip()

GITHUB_API_BASE = f"https://api.github.com/repos/{GITHUB_REPO_OWNER}/{GITHUB_REPO_NAME}/contents"
HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json",
}


def compress_image(image_bytes: bytes, max_width: int = 1400, quality: int = 82) -> bytes:
    """Compress and resize image to optimize for web loading."""
    image = Image.open(io.BytesIO(image_bytes))
    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")

    width, height = image.size
    if width > max_width:
        new_height = int((max_width / width) * height)
        image = image.resize((max_width, new_height), Image.Resampling.LANCZOS)

    output = io.BytesIO()
    image.save(output, format="JPEG", quality=quality, optimize=True)
    return output.getvalue()


def upload_file_to_github(file_path: str, content_bytes: bytes, commit_message: str):
    """Upload or update a file in the GitHub repo via REST API."""
    url = f"{GITHUB_API_BASE}/{file_path}"
    
    sha = None
    res = requests.get(url, headers=HEADERS, params={"ref": GITHUB_BRANCH})
    if res.status_code == 200:
        sha = res.json().get("sha")

    data = {
        "message": commit_message,
        "content": base64.b64encode(content_bytes).decode("utf-8"),
        "branch": GITHUB_BRANCH,
    }
    if sha:
        data["sha"] = sha

    response = requests.put(url, headers=HEADERS, json=data)
    if response.status_code not in (200, 201):
        raise RuntimeError(f"GitHub API Error ({response.status_code}): {response.text}")
    return response.json()


def delete_file_from_github(file_path: str, commit_message: str):
    """Delete a file from the GitHub repo via REST API if it exists."""
    url = f"{GITHUB_API_BASE}/{file_path}"
    res = requests.get(url, headers=HEADERS, params={"ref": GITHUB_BRANCH})
    if res.status_code == 200:
        sha = res.json().get("sha")
        delete_data = {
            "message": commit_message,
            "sha": sha,
            "branch": GITHUB_BRANCH,
        }
        requests.delete(url, headers=HEADERS, json=delete_data)


def get_file_from_github(file_path: str):
    """Fetch content of a JSON file from GitHub repo."""
    url = f"{GITHUB_API_BASE}/{file_path}"
    res = requests.get(url, headers=HEADERS, params={"ref": GITHUB_BRANCH})
    if res.status_code == 200:
        file_data = res.json()
        raw_content = base64.b64decode(file_data["content"]).decode("utf-8")
        return json.loads(raw_content), file_data["sha"]
    return [], None


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = str(update.effective_user.id)
    if ALLOWED_USER_ID and user_id != str(ALLOWED_USER_ID):
        await update.message.reply_text("⛔ Unauthorized access.")
        return

    welcome_text = (
        "👋 **Welcome to your Portfolio Exchange Sync Bot!**\n\n"
        "📸 **How to Post:**\n"
        "Send any photo with or without a caption:\n\n"
        "• **With Location & Tag:**\n"
        "  `Florence, Italy 🇮🇹 | Sunset over the Arno river | Food`\n\n"
        "• **With Location & Caption:**\n"
        "  `Interlaken, Switzerland 🇨🇭 | First morning in the Alps!`\n\n"
        "• **Just a Caption (or no caption):**\n"
        "  `Enjoying coffee by the canal`\n\n"
        "🗑️ **Manage Posts:**\n"
        "• `/list` — View published postcards\n"
        "• `/delete_latest` — Delete the most recent postcard\n"
        "• `/delete <number>` — Delete a specific postcard (e.g. `/delete 1`)"
    )
    await update.message.reply_text(welcome_text, parse_mode="Markdown")


async def list_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = str(update.effective_user.id)
    if ALLOWED_USER_ID and user_id != str(ALLOWED_USER_ID):
        await update.message.reply_text("⛔ Unauthorized.")
        return

    json_repo_path = "src/data/liveTravelDispatches.json"
    dispatches, _ = get_file_from_github(json_repo_path)

    if not dispatches or not isinstance(dispatches, list):
        await update.message.reply_text("📭 No postcards published yet.")
        return

    lines = ["📸 **Current Published Postcards:**\n"]
    for idx, item in enumerate(dispatches, 1):
        loc = item.get("location") or "No location"
        cap = item.get("caption") or "No caption"
        date = item.get("date") or ""
        lines.append(f"**{idx}.** {loc} — *{cap}* ({date})")

    lines.append("\nTo delete a post, send `/delete <number>` or `/delete_latest`")
    await update.message.reply_text("\n".join(lines), parse_mode="Markdown")


async def delete_latest_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = str(update.effective_user.id)
    if ALLOWED_USER_ID and user_id != str(ALLOWED_USER_ID):
        await update.message.reply_text("⛔ Unauthorized.")
        return

    json_repo_path = "src/data/liveTravelDispatches.json"
    dispatches, _ = get_file_from_github(json_repo_path)

    if not dispatches or not isinstance(dispatches, list):
        await update.message.reply_text("📭 No postcards to delete.")
        return

    status_msg = await update.message.reply_text("⏳ Deleting latest postcard...")

    deleted_item = dispatches.pop(0)
    image_path = deleted_item.get("image", "").lstrip("/")

    # Delete image file on GitHub if local image
    if image_path.startswith("public/"):
        delete_file_from_github(image_path, f"Delete image: {image_path}")
    elif image_path.startswith("exchange/"):
        delete_file_from_github(f"public/{image_path}", f"Delete image: {image_path}")

    # Update JSON
    updated_json_bytes = json.dumps(dispatches, indent=2).encode("utf-8")
    upload_file_to_github(json_repo_path, updated_json_bytes, "Delete latest travel dispatch")

    loc = deleted_item.get("location") or ""
    cap = deleted_item.get("caption") or ""
    await status_msg.edit_text(
        f"🗑️ **Deleted latest postcard:**\n{loc} {cap}\n\nRemaining: {len(dispatches)} postcards.",
        parse_mode="Markdown"
    )


async def delete_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = str(update.effective_user.id)
    if ALLOWED_USER_ID and user_id != str(ALLOWED_USER_ID):
        await update.message.reply_text("⛔ Unauthorized.")
        return

    if not context.args:
        await update.message.reply_text("ℹ️ Please specify the number to delete (e.g. `/delete 1`). Use `/list` to view numbers.", parse_mode="Markdown")
        return

    try:
        target_idx = int(context.args[0]) - 1
    except ValueError:
        await update.message.reply_text("❌ Invalid number. Example: `/delete 1`")
        return

    json_repo_path = "src/data/liveTravelDispatches.json"
    dispatches, _ = get_file_from_github(json_repo_path)

    if not dispatches or target_idx < 0 or target_idx >= len(dispatches):
        await update.message.reply_text(f"❌ Postcard #{context.args[0]} not found. Use `/list` to view all posts.")
        return

    status_msg = await update.message.reply_text(f"⏳ Deleting postcard #{context.args[0]}...")

    deleted_item = dispatches.pop(target_idx)
    image_path = deleted_item.get("image", "").lstrip("/")

    # Delete image file on GitHub if local image
    if image_path.startswith("public/"):
        delete_file_from_github(image_path, f"Delete image: {image_path}")
    elif image_path.startswith("exchange/"):
        delete_file_from_github(f"public/{image_path}", f"Delete image: {image_path}")

    # Update JSON
    updated_json_bytes = json.dumps(dispatches, indent=2).encode("utf-8")
    upload_file_to_github(json_repo_path, updated_json_bytes, f"Delete travel dispatch #{context.args[0]}")

    loc = deleted_item.get("location") or ""
    cap = deleted_item.get("caption") or ""
    await status_msg.edit_text(
        f"🗑️ **Deleted postcard #{context.args[0]}:**\n{loc} {cap}\n\nRemaining: {len(dispatches)} postcards.",
        parse_mode="Markdown"
    )


async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = str(update.effective_user.id)
    if ALLOWED_USER_ID and user_id != str(ALLOWED_USER_ID):
        await update.message.reply_text("⛔ Unauthorized.")
        return

    if not GITHUB_TOKEN:
        await update.message.reply_text("❌ GITHUB_TOKEN is not configured in .env.")
        return

    status_msg = await update.message.reply_text("⏳ Processing and optimizing photo...")

    try:
        # Download highest resolution photo
        photo_file = await update.message.photo[-1].get_file()
        photo_bytearray = await photo_file.download_as_bytearray()

        # Optimize image
        optimized_bytes = compress_image(bytes(photo_bytearray))

        # Parse caption without forcing fake defaults
        raw_caption = (update.message.caption or "").strip()
        location = ""
        caption = ""
        tag = ""

        if "|" in raw_caption:
            parts = [p.strip() for p in raw_caption.split("|")]
            if len(parts) >= 3:
                location, caption, tag = parts[0], parts[1], parts[2]
            elif len(parts) == 2:
                location, caption = parts[0], parts[1]
        else:
            caption = raw_caption

        now = datetime.datetime.now()
        timestamp = now.strftime("%Y%m%d_%H%M%S")
        date_str = now.strftime("%b %d, %Y")
        filename = f"exchange_{timestamp}.jpg"

        # 1. Upload image to public/exchange/
        image_repo_path = f"public/exchange/{filename}"
        upload_file_to_github(
            image_repo_path,
            optimized_bytes,
            f"Add exchange photo: {filename}",
        )

        # 2. Update src/data/liveTravelDispatches.json
        json_repo_path = "src/data/liveTravelDispatches.json"
        dispatches, _ = get_file_from_github(json_repo_path)
        if not isinstance(dispatches, list):
            dispatches = []

        new_entry = {
            "id": f"post-{timestamp}",
            "image": f"/exchange/{filename}",
            "location": location,
            "caption": caption,
            "date": date_str,
            "tag": tag,
        }

        # Prepend to front of list
        dispatches.insert(0, new_entry)
        updated_json_bytes = json.dumps(dispatches, indent=2).encode("utf-8")

        commit_desc = location or caption or filename
        upload_file_to_github(
            json_repo_path,
            updated_json_bytes,
            f"Update travel dispatch: {commit_desc}",
        )

        success_lines = ["🎉 **Published successfully to your Portfolio!**\n"]
        if location:
            success_lines.append(f"📍 **Location:** {location}")
        if caption:
            success_lines.append(f"💬 **Caption:** {caption}")
        if tag:
            success_lines.append(f"🏷️ **Tag:** {tag}")
        success_lines.append(f"📅 **Date:** {date_str}\n")
        success_lines.append("🚀 Your site deployment has been triggered.")

        await status_msg.edit_text("\n".join(success_lines), parse_mode="Markdown")

    except Exception as e:
        await status_msg.edit_text(f"❌ Error publishing photo: {str(e)}")


def main():
    if not TELEGRAM_BOT_TOKEN:
        print("Error: TELEGRAM_BOT_TOKEN is required. Set it in sync-bot/.env")
        return

    app = ApplicationBuilder().token(TELEGRAM_BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start_command))
    app.add_handler(CommandHandler("list", list_command))
    app.add_handler(CommandHandler("delete_latest", delete_latest_command))
    app.add_handler(CommandHandler("delete", delete_command))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo))

    print("🤖 Telegram Exchange Bot is running with delete & caption support...")
    app.run_polling()


if __name__ == "__main__":
    main()
