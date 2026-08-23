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
    
    # Check if file exists to get SHA for updates
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


def get_file_from_github(file_path: str):
    """Fetch content of a file from GitHub repo."""
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
        "👋 Welcome to your Portfolio Exchange Sync Bot!\n\n"
        "Send me a photo with a caption to publish a live postcard to your portfolio:\n\n"
        "📝 Caption Format Options:\n"
        "1. `Location | Caption | Tag`\n"
        "   Example: `Florence, Italy 🇮🇹 | Sunset over the Arno river | Sunset & Food`\n\n"
        "2. `Location | Caption`\n"
        "   Example: `Interlaken, Switzerland 🇨🇭 | First morning in the Alps!`\n\n"
        "3. Or just send any caption!"
    )
    await update.message.reply_text(welcome_text, parse_mode="Markdown")


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

        # Parse caption
        raw_caption = update.message.caption or "Exploring Europe!"
        parts = [p.strip() for p in raw_caption.split("|")]

        if len(parts) >= 3:
            location, caption, tag = parts[0], parts[1], parts[2]
        elif len(parts) == 2:
            location, caption = parts[0], parts[1]
            tag = "Travel Memory"
        else:
            location = "Europe ✈️"
            caption = parts[0]
            tag = "Exchange"

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

        upload_file_to_github(
            json_repo_path,
            updated_json_bytes,
            f"Update travel dispatch: {location}",
        )

        success_msg = (
            "🎉 **Published successfully to your Portfolio!**\n\n"
            f"📍 **Location:** {location}\n"
            f"💬 **Caption:** {caption}\n"
            f"🏷️ **Tag:** {tag}\n"
            f"📅 **Date:** {date_str}\n\n"
            "🚀 Your site deployment has been triggered."
        )
        await status_msg.edit_text(success_msg, parse_mode="Markdown")

    except Exception as e:
        await status_msg.edit_text(f"❌ Error publishing photo: {str(e)}")


def main():
    if not TELEGRAM_BOT_TOKEN:
        print("Error: TELEGRAM_BOT_TOKEN is required. Set it in sync-bot/.env")
        return

    app = ApplicationBuilder().token(TELEGRAM_BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start_command))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo))

    print("🤖 Telegram Exchange Bot is running and waiting for photos...")
    app.run_polling()


if __name__ == "__main__":
    main()
