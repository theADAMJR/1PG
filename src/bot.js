import { Client } from 'discord.js';

const bot = new Client();

bot.on('ready', () => console.log(`${bot.user.username} is online`));
bot.on('message', async (msg) => {
  if (msg.author.bot) return;

  await msg.reply('Hi');
});

bot.login('ODE0MjI0MjI4ODY1OTMzMzYy.YDavZw.ObHieu2X2DLiMeI2hpXjAv9uwOY');
