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

### Always-on deployment with Render

The repository includes `render.yaml` for running the bot as a Render background worker.

1. Push the repository to GitHub.
2. In Render, choose **New → Blueprint** and select this repository.
3. Add these secret environment variables when prompted:
   - `TELEGRAM_BOT_TOKEN`
   - `ALLOWED_TELEGRAM_USER_ID`
   - `GITHUB_TOKEN`
4. Confirm the service uses the `master` branch and deploy it.
5. In the Render logs, confirm `Telegram Exchange Bot is running`.

The worker must remain separate from the Vercel frontend. Render keeps the Telegram polling process alive, while GitHub commits from the bot continue to trigger Vercel deployments.

### Free always-on deployment with an Oracle Cloud VPS

For a no-cost 24/7 bot, create an Oracle Cloud **Always Free** Ubuntu ARM instance. The VPS must be running continuously; Oracle may require account verification and has limited free capacity.

On the VPS, install the bot and its service:

```bash
sudo apt update && sudo apt install -y git python3-venv
sudo git clone https://github.com/fongshihui/my-portfolio.git /opt/my-portfolio
cd /opt/my-portfolio
python3 -m venv venv
./venv/bin/pip install -r sync-bot/requirements.txt
sudo nano sync-bot/.env
sudo cp sync-bot/my-portfolio-bot.service /etc/systemd/system/my-portfolio-bot.service
sudo systemctl daemon-reload
sudo systemctl enable --now my-portfolio-bot
```

Set `TELEGRAM_BOT_TOKEN`, `ALLOWED_TELEGRAM_USER_ID`, and `GITHUB_TOKEN` in `/opt/my-portfolio/sync-bot/.env`. Check that it is running with:

```bash
sudo systemctl status my-portfolio-bot
sudo journalctl -u my-portfolio-bot -f
```

The service restarts the bot after crashes and starts it again after VPS reboots. Keep `.env` only on the VPS; never commit it.

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
