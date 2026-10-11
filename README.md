# Tsundere AI Girlfriend Discord Bot

A Discord.js bot using Groq for chat, JSON-file memory, daily greeting DMs, and optional server greeting channels.

## Requirements

- Node.js 20 or newer (use a current LTS release).
- A Discord application/bot and its token.
- A Groq API key.

## 1. Create the Discord bot

1. Open https://discord.com/developers/applications and create an application.
2. Open **Bot**, create/reset the bot token, and copy it privately.
3. In **Bot > Privileged Gateway Intents**, enable **Message Content Intent**. This is required for the bot to read message text.
4. Open **OAuth2 > URL Generator**. Select scopes `bot` and `applications.commands`.
5. Grant at least `View Channels`, `Send Messages`, `Read Message History`, and `Use Slash Commands`. Open the generated URL and add it to your server.
6. Copy the Application ID from **General Information** as `DISCORD_CLIENT_ID`.
7. For testing, enable Developer Mode in Discord, right-click your test server and copy its ID for `DISCORD_GUILD_ID`.

## 2. Get a Groq API key

Create an API key at https://console.groq.com/ and copy it. Never commit your API key or Discord token to GitHub.

## 3. Configure and install

```bash
cp .env.example .env
nano .env
npm install
npm run deploy-commands
npm start
```

Fill in `DISCORD_TOKEN`, `DISCORD_CLIENT_ID`, `GROQ_API_KEY`, and (for instant test-server command updates) `DISCORD_GUILD_ID` in `.env`. Set `GROQ_MODEL` to a model currently available to your Groq account. Remove `DISCORD_GUILD_ID` when you want to register commands globally; global command propagation may take longer.

## 4. How to use it

- **DM:** send Yuki a message; she replies to messages in DMs.
- **Server:** mention the bot or reply directly to one of its messages. She does not read/respond to every server conversation.
- `/remember fact: I like iced coffee` — save a fact for future conversations.
- `/memory` — show saved facts.
- `/forget` — clear your saved facts and recent chat history.
- `/greetings-enable` and `/greetings-disable` — opt in/out of daily greeting DMs.
- `/set-greeting-channel channel: #general` — server admin enables daily greetings in a channel.
- `/clear-greeting-channel` — server admin disables channel greetings.
- `/ping` — check the bot.

Daily greetings use `TIMEZONE`, `MORNING_CRON`, and `NIGHT_CRON` from `.env`. Defaults are 08:00 and 22:00 in `Asia/Jakarta`. DM greetings require the user to allow DMs from the bot's server. Server greeting messages are posted once per configured server each scheduled run.

## 5. Keep it running on Ubuntu with PM2

```bash
sudo npm install -g pm2
pm2 start index.js --name yuki-discord
pm2 save
pm2 startup
```

Run the command printed by `pm2 startup`, then use:

```bash
pm2 status
pm2 logs yuki-discord
pm2 restart yuki-discord
```

Run `npm run deploy-commands` again whenever you change slash-command definitions.

## Memory and privacy

- Persistent data is stored in `data/memory.json`. Back it up if you want to preserve memories; protect it because it contains Discord user IDs, saved facts, and recent chat messages.
- `/forget` clears the invoking user's saved facts and recent history.
- The included memory is per Discord user. In a server, the bot only responds when mentioned or replied to, but those messages are still sent to Groq to generate a reply.
- Do not store highly sensitive personal information. Anyone with access to the VPS/files can read the JSON file. Back up the file before editing it manually.
- This starter stores recent chat history but does not automatically infer and save new facts from every conversation; use `/remember` for deliberate, reliable long-term memories.

## Troubleshooting

- **401 from Groq:** check `GROQ_API_KEY`.
- **Model not found / no access:** set `GROQ_MODEL` to a model currently listed in your Groq console. Model availability changes over time.
- **No response in server:** enable Message Content Intent in the Developer Portal, ensure the bot has channel permissions, and mention it or reply to it.
- **Slash commands missing:** rerun `npm run deploy-commands`; check `DISCORD_CLIENT_ID` and `DISCORD_GUILD_ID`.
- **Greeting DMs fail:** allow DMs from server members and verify the bot can DM the user.
- **Invalid memory JSON:** stop the bot, back up `data/memory.json`, and repair it or restore a valid JSON file.
