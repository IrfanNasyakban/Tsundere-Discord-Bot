import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder, ChannelType } from 'discord.js';

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Check whether Yuki is online.'),
  new SlashCommandBuilder().setName('remember').setDescription('Ask Yuki to remember a fact about you.')
    .addStringOption(o => o.setName('fact').setDescription('A detail to remember for future chats').setRequired(true).setMaxLength(300)),
  new SlashCommandBuilder().setName('memory').setDescription('Show the facts Yuki remembers about you.'),
  new SlashCommandBuilder().setName('forget').setDescription('Clear your saved facts and conversation history.'),
  new SlashCommandBuilder().setName('greetings-enable').setDescription('Opt in to daily good-morning and good-night DMs.'),
  new SlashCommandBuilder().setName('greetings-disable').setDescription('Stop daily greeting DMs.'),
  new SlashCommandBuilder().setName('set-greeting-channel').setDescription('Set this server channel for daily greetings (server admins only).')
    .addChannelOption(o => o.setName('channel').setDescription('Text channel for daily greetings').addChannelTypes(ChannelType.GuildText).setRequired(true)),
  new SlashCommandBuilder().setName('clear-greeting-channel').setDescription('Disable daily greetings in this server (server admins only).')
].map(c => c.toJSON());

if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID) {
  throw new Error('Set DISCORD_TOKEN and DISCORD_CLIENT_ID in .env first.');
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const route = process.env.DISCORD_GUILD_ID
  ? Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID)
  : Routes.applicationCommands(process.env.DISCORD_CLIENT_ID);

await rest.put(route, { body: commands });
console.log(`Registered ${commands.length} slash commands ${process.env.DISCORD_GUILD_ID ? 'to test guild' : 'globally'}.`);
