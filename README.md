# 💗 Deby — Tsundere AI Girlfriend Bot

An AI-powered Discord companion built with **JavaScript, Discord.js, and Groq**. Deby features a tsundere personality, conversational AI, persistent JSON-based memory, and scheduled daily greetings.

This personal project explores the integration of large language models into Discord bots, with a focus on conversational interaction, personalization, and lightweight data persistence.

## ✨ Features

* **AI-Powered Conversations** — Generate contextual responses using the Groq API.
* **Tsundere Personality** — A playful, slightly sarcastic, and secretly affectionate AI companion.
* **Discord Integration** — Interact through direct messages, server mentions, and replies to the bot's messages.
* **Persistent Memory** — Store personal facts and recent conversation history in a local JSON file.
* **Memory Management** — Save, view, and clear personal memories using slash commands.
* **Daily Greetings** — Schedule good morning and good night messages through direct messages or configured server channels.
* **Slash Commands** — Manage memory, greetings, and bot functionality directly from Discord.
* **Timezone Configuration** — Customize greeting schedules and timezone settings through environment variables.
* **VPS Deployment** — Support for continuous execution on Ubuntu using PM2.

## 🛠️ Tech Stack

| Technology              | Purpose                           |
| ----------------------- | --------------------------------- |
| JavaScript (ES Modules) | Application logic                 |
| Node.js                 | Runtime environment               |
| Discord.js              | Discord API integration           |
| Groq API                | AI-powered conversations          |
| JSON                    | Persistent memory storage         |
| node-cron               | Scheduled daily greetings         |
| dotenv                  | Environment variable management   |
| PM2                     | Process management and deployment |

## 📋 Prerequisites

Before running the project, make sure you have:

* [Node.js](https://nodejs.org/) 20 or newer
* [npm](https://www.npmjs.com/)
* A Discord application and bot token
* A Groq API key
* A Discord server where you have permission to add bots

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/deby-discord-bot.git
cd deby-discord-bot
```

Replace `YOUR_USERNAME` and the repository name with your actual GitHub details.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file using the provided example:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Configure the following variables in `.env`:

```dotenv
# Discord Configuration
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_application_id
DISCORD_GUILD_ID=your_test_server_id

# Groq API Configuration
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_available_groq_model

# Greeting Configuration
TIMEZONE=Asia/Jakarta
MORNING_CRON=0 8 * * *
NIGHT_CRON=0 22 * * *

# Companion Configuration
GIRLFRIEND_NAME=Deby
```

**Configuration notes:**

* `DISCORD_TOKEN`: Authentication token for the Discord bot.
* `DISCORD_CLIENT_ID`: Application ID from the Discord Developer Portal.
* `DISCORD_GUILD_ID`: Optional server ID for testing slash commands. Leave empty for global command registration if supported by the deployment script.
* `GROQ_API_KEY`: API key generated through the Groq Console.
* `GROQ_MODEL`: A model identifier currently available to your Groq account.
* `TIMEZONE`: Timezone used for scheduled greetings.
* `MORNING_CRON`: Schedule for morning greetings.
* `NIGHT_CRON`: Schedule for evening greetings.
* `GIRLFRIEND_NAME`: Display name used for the AI companion.

Never commit `.env` or expose API keys and bot tokens in your source code.

### 4. Configure the Discord application

1. Open the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create an application and configure its bot.
3. Enable **Message Content Intent** under the bot's privileged gateway intents.
4. Open **OAuth2 → URL Generator**.
5. Select the `bot` and `applications.commands` scopes.
6. Grant the permissions required for viewing channels, reading message history, and sending messages.
7. Use the generated URL to invite the bot to your Discord server.

Keep bot permissions limited to what the application actually needs.

### 5. Register slash commands

Run:

```bash
npm run deploy-commands
```

For development, using `DISCORD_GUILD_ID` registers commands to your test server, allowing faster updates. Global commands may take longer to propagate.

### 6. Start the bot

```bash
npm start
```

Once connected successfully, Deby can respond to supported messages and slash commands.

## 💬 Available Commands

| Command                   | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| `/ping`                   | Check the bot's responsiveness.                               |
| `/remember`               | Save a personal fact to persistent memory.                    |
| `/memory`                 | View saved facts associated with your Discord account.        |
| `/forget`                 | Clear your saved facts and recent conversation history.       |
| `/greetings-enable`       | Subscribe to daily greeting DMs.                              |
| `/greetings-disable`      | Unsubscribe from daily greeting DMs.                          |
| `/set-greeting-channel`   | Configure a server channel for scheduled greetings.           |
| `/clear-greeting-channel` | Disable scheduled greetings in the configured server channel. |

### Conversational Interaction

**Direct messages:** Send Deby a message to start a conversation.

**Server channels:** Mention Deby or reply directly to one of her messages.

The bot does not automatically respond to every conversation in a server.

## 🧠 Memory System

Deby uses a local JSON file to maintain persistent user-specific information.

The memory system supports:

* Explicitly saved personal facts.
* Recent conversation history for contextual responses.
* Separate memory records for individual Discord users.
* Commands for viewing and clearing stored information.

Memory is stored in:

```text
data/memory.json
```

The file persists between restarts, provided it is not deleted or overwritten.

**Current limitation:** The starter implementation does not automatically extract and permanently save new facts from every conversation. Use `/remember` to save important information explicitly.

## ⏰ Scheduled Greetings

Deby supports scheduled good morning and good night messages.

Default configuration:

| Setting          | Default      |
| ---------------- | ------------ |
| Morning greeting | 08:00        |
| Night greeting   | 22:00        |
| Timezone         | Asia/Jakarta |

The schedules can be customized through `MORNING_CRON`, `NIGHT_CRON`, and `TIMEZONE`.

Users must enable greeting DMs, and Discord privacy settings may prevent direct messages. Alternatively, server administrators can configure a channel for scheduled greetings.

The bot must remain online for scheduled jobs to execute.

## 🌐 Deployment with PM2

For an Ubuntu VPS, PM2 can keep the bot running in the background.

### Install PM2

```bash
sudo npm install -g pm2
```

### Start the application

```bash
pm2 start index.js --name deby-discord
pm2 save
pm2 startup
```

Run the additional command printed by `pm2 startup` to configure startup persistence.

### Useful commands

```bash
pm2 status
pm2 logs deby-discord
pm2 restart deby-discord
pm2 stop deby-discord
```

Whenever slash-command definitions change, register them again:

```bash
npm run deploy-commands
```

## 🔒 Security and Privacy

This project uses third-party services and local storage, so appropriate security practices are important.

* Keep Discord tokens and Groq API keys in environment variables.
* Add `.env` to `.gitignore`.
* Do not publish `data/memory.json` because it may contain Discord user IDs, personal facts, and conversation history.
* Restrict access to the VPS and project files.
* Back up memory data securely before making changes.
* Avoid storing sensitive personal information.
* Remember that messages sent to the AI provider are processed by that provider to generate responses.

The `/forget` command clears the invoking user's saved facts and recent conversation history within the implemented memory system. It does not delete records held independently by external providers.

## 🐛 Troubleshooting

| Issue                            | Possible Solution                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| Groq API returns `401`           | Verify that `GROQ_API_KEY` is valid.                                                                |
| Model not found or unavailable   | Configure `GROQ_MODEL` with a model accessible to your account.                                     |
| Bot does not respond in a server | Check Message Content Intent, channel permissions, and whether the bot was mentioned or replied to. |
| Slash commands are missing       | Rerun `npm run deploy-commands` and verify the application and server IDs.                          |
| Greeting DMs fail                | Check the user's DM privacy settings and whether the bot can contact them.                          |
| Memory file cannot be parsed     | Stop the bot, back up the file, and restore valid JSON.                                             |
| Scheduled messages are not sent  | Verify the timezone, cron expressions, and that the bot is online.                                  |

## 🗺️ Future Improvements

Potential enhancements for future development include:

* Automatic extraction of relevant facts from conversations.
* Relationship levels and progressive personality changes.
* Customizable companion personalities.
* Voice interaction and text-to-speech integration.
* A configurable user preference and greeting system.
* Improved memory search and conversation summarization.
* Additional automated tests and error monitoring.

## 👨‍💻 About the Project

Deby is a personal development project created to explore Discord bot development, AI integration, conversational design, and persistent data management.

The project serves as a practical learning experience in building interactive applications with JavaScript and external APIs.

## 📄 License

Choose a license before distributing or accepting contributions. If you want this project to be open source, consider the [MIT License](https://choosealicense.com/licenses/mit/).

---

**Built with JavaScript, Discord.js, and Groq.** 💗
