import { config } from 'dotenv';
config({ path: '.env' });

import { Client } from 'discord.js';

const bot = new Client();

bot.on('ready', () => console.log(`${bot.user.username} is online`));
bot.on('message', async (msg) => {
  if (msg.author.bot) return;

  await msg.reply('Hi');
});

bot.login(process.env.BOT_TOKEN);
