# 🎄 Code of Eve Christmas Bot 🎅

A **festive Discord bot** that brings Christmas spirit, positivity, and emotional balance to the Code of Eve community!

![Bot Status](https://img.shields.io/badge/status-ready%20for%20deployment-green)
![Discord.js](https://img.shields.io/badge/discord.js-v14-blue)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.9.0-brightgreen)

---

## 🎁 Features

### ✨ Christmas-Themed Commands

| Command | Description |
|---------|-------------|
| `/christmas` | Get a random Christmas quote or blessing 🎄 |
| `/cheer` | Receive a motivational holiday message ✨ |
| `/countdown` | Live countdown to New Year 2027 🎆 |
| `/snow` | Watch a beautiful snowflake animation ❄️ |
| `/peace` | Get a calming message for heated moments 🕊️ |
| `/about` | Learn about the bot and its features 🎅 |

### 🎧 Voice Channel Positivity Monitor

The bot monitors voice channels and gently encourages calm and kindness when it detects:
- Users joining active voice channels
- Users unmuting themselves
- Rapid voice activity changes

**Example Response:**
> 🎄 Ho ho ho! Let's keep the vibes warm and cheerful, friends ❤️

### 💚 Positive Reinforcement System

The bot detects kind messages containing words like:
- "thank you" / "thanks"
- "appreciate" / "grateful"
- "awesome" / "amazing"
- "great job" / "well done"

**When detected, it responds with praise:**
> 🎁 You just made the server brighter, keep spreading joy! ✨

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** v16.9.0 or higher ([Download](https://nodejs.org/))
- A **Discord Bot Token** (see steps below)
- A **Discord Server** for testing

### Step 1: Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** and name it `codeofeve_jobinpbinu`
3. Go to the **"Bot"** section in the left sidebar
4. Click **"Add Bot"** and confirm
5. Under "Privileged Gateway Intents", enable:
   - ✅ **Presence Intent**
   - ✅ **Server Members Intent**
   - ✅ **Message Content Intent**
6. Click **"Reset Token"** and copy your bot token (save it securely!)

### Step 2: Invite Bot to Your Server

1. Go to **"OAuth2"** → **"URL Generator"**
2. Select scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Select bot permissions:
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ Read Message History
   - ✅ Connect (voice)
   - ✅ View Channels
4. Copy the generated URL and open it in your browser
5. Select your server and authorize the bot

### Step 3: Install Dependencies

```bash
cd eve-xmas-bot
npm install
```

### Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and add your values:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_application_id_here
   GUILD_ID=your_server_id_here
   ```

**How to get these values:**
- `DISCORD_TOKEN`: From Step 1 (Bot section)
- `CLIENT_ID`: Application ID from "General Information"
- `GUILD_ID`: Right-click your server → Copy Server ID (enable Developer Mode in Discord settings first)

### Step 5: Deploy Slash Commands

```bash
npm run deploy
```

You should see:
```
✨ Successfully registered 6 slash commands!
```

### Step 6: Start the Bot

```bash
npm start
```

You should see:
```
🎄 =====================================
🎅 Bot logged in as codeofeve_jobinpbinu#1234
✨ Ready to spread Christmas cheer!
🌟 Serving 1 server(s)
🎄 =====================================
```

---

## 🌐 Deployment (Production)

### Option 1: Railway

1. Create account at [Railway.app](https://railway.app/)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Connect your repository
4. Add environment variables in Railway dashboard:
   - `DISCORD_TOKEN`
   - `CLIENT_ID`
5. Railway will auto-deploy and keep bot online 24/7

### Option 2: Render

1. Create account at [Render.com](https://render.com/)
2. Click **"New"** → **"Web Service"**
3. Connect your repository
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables in Render dashboard
6. Click **"Create Web Service"**

### Option 3: VPS (Advanced)

Use PM2 to keep the bot running:

```bash
npm install -g pm2
pm2 start index.js --name codeofeve-bot
pm2 save
pm2 startup
```

---

## 📂 Project Structure

```
eve-xmas-bot/
├── commands/           # Slash command files
│   ├── about.js
│   ├── cheer.js
│   ├── christmas.js
│   ├── countdown.js
│   ├── peace.js
│   └── snow.js
├── events/            # Event handler files
│   ├── interactionCreate.js
│   ├── messageCreate.js
│   ├── ready.js
│   └── voiceStateUpdate.js
├── utils/             # Utility functions
│   ├── cooldown.js
│   └── messages.js
├── config/
│   └── config.json    # Bot configuration
├── .env.example       # Environment template
├── .gitignore
├── deploy-commands.js # Command registration script
├── index.js          # Main bot entry point
├── package.json
└── README.md
```

---

## 🎨 Customization

### Adding New Christmas Quotes

Edit `config/config.json` and add to the `christmasQuotes` array:

```json
"christmasQuotes": [
  "🎄 Your new quote here!",
  ...
]
```

### Adjusting Cooldowns

In `config/config.json`, modify cooldown durations (in milliseconds):

```json
"cooldowns": {
  "voiceReminder": 300000,    // 5 minutes
  "praiseMessage": 180000     // 3 minutes
}
```

### Adding More Kindness Keywords

In `config/config.json`, add to `kindnessKeywords`:

```json
"kindnessKeywords": [
  "thank you",
  "your_new_keyword",
  ...
]
```

---

## 🧪 Testing

### Test Commands

In your Discord server, try each command:
- `/christmas`
- `/cheer`
- `/countdown`
- `/snow`
- `/peace`
- `/about`

### Test Voice Monitoring

1. Join a voice channel with multiple people
2. Unmute yourself
3. Check if bot sends a gentle reminder in text channel

### Test Positive Reinforcement

1. Send a message with "thank you" or "appreciate"
2. Bot should reply with a praise message

---

## ❓ Troubleshooting

### Bot doesn't respond to commands
- Ensure you ran `npm run deploy` to register commands
- Check bot has proper permissions in the server
- Verify `CLIENT_ID` is correct in `.env`

### Bot is offline
- Check `DISCORD_TOKEN` is correct in `.env`
- Ensure all intents are enabled in Discord Developer Portal
- Check console for error messages

### Voice monitoring doesn't work
- Verify bot has "View Channels" and "Connect" permissions
- Check that voice state intents are enabled
- Ensure bot can send messages in text channels

### Commands registered globally but not showing
- Global commands take up to 1 hour to propagate
- Use `GUILD_ID` in `.env` for instant testing
- Try restarting Discord client

---

## 🎯 Bot Personality

The bot embodies a **Christmas Elf / Santa's Helper** with:
- ✨ Warm and cheerful tone
- 🎄 Festive emoji usage
- ❤️ Encouraging emotional balance
- 🎅 No punishment, only positivity

**Example personality line:**
> 🎅 "Ho ho ho! Let's take a deep breath and keep the Christmas spirit alive, friends ❤️"

---

## 📜 License

MIT License - Feel free to use and modify!

---

## 🤝 Contributing

Want to add more Christmas features? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Add your festive improvements
4. Submit a pull request

---

## 💝 Credits

**Created with ❤️ for the Code of Eve community**

Bot Name: `codeofeve_jobinpbinu`

---

## 🎊 Merry Christmas! 🎊

May this bot bring joy, peace, and Christmas cheer to your Discord community! 🎄✨

**Ho ho ho!** 🎅
