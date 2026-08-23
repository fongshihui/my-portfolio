# Telegram Exchange Sync Bot 📸

This bot allows you to send photos directly from your phone on Telegram to automatically publish live postcards and travel dispatches to your portfolio's **Europe Exchange** tab.

---

## 🚀 Quick Setup Guide

### 1. Create your Telegram Bot
1. Open Telegram and search for **[@BotFather](https://t.me/BotFather)**.
2. Send `/newbot`, choose a name (e.g., `Renee Portfolio Bot`) and username (e.g., `renee_exchange_sync_bot`).
3. Copy the **HTTP API Token** provided.

### 2. Get Your Telegram User ID (For Security)
1. Search for **[@userinfobot](https://t.me/userinfobot)** on Telegram and click `Start`.
2. Copy your numerical **Id** (e.g. `123456789`). This ensures only you can post to your website.

### 3. Generate a GitHub Personal Access Token
1. Go to **GitHub Settings** $\rightarrow$ **Developer settings** $\rightarrow$ **Personal access tokens** $\rightarrow$ **Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Check the `repo` scope.
4. Copy the token (starts with `ghp_...`).

---

## 🛠️ Configuration

1. In `sync-bot/`, copy `.env.example` to `.env`:
   ```bash
   cp sync-bot/.env.example sync-bot/.env
   ```
2. Fill in your credentials inside `sync-bot/.env`:
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
   ALLOWED_TELEGRAM_USER_ID=your_telegram_numeric_id
   GITHUB_TOKEN=your_github_pat_token
   GITHUB_REPO_OWNER=fongshihui
   GITHUB_REPO_NAME=my-portfolio
   GITHUB_BRANCH=main
   ```

---

## ▶️ Running the Bot

1. Install Python dependencies:
   ```bash
   pip install -r sync-bot/requirements.txt
   ```

2. Run the bot:
   ```bash
   python sync-bot/bot.py
   ```

---

## 📱 How to Post

Send a photo to your bot on Telegram with any of these caption formats:

1. **Full Details**:
   ```
   Florence, Italy 🇮🇹 | Sunset over the Arno river after the best homemade pasta | Sunset & Food
   ```
2. **Location + Caption**:
   ```
   Interlaken, Switzerland 🇨🇭 | First morning in the Swiss Alps!
   ```
3. **Simple Caption**:
   ```
   Exploring Amsterdam canals!
   ```

The bot will automatically:
- Compress the photo for web performance.
- Commit the photo to `public/exchange/`.
- Prepend the entry to `src/data/liveTravelDispatches.json`.
- Trigger your portfolio deployment!
