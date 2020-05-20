const { handleCommand } = require('./handlers/command-handler'),
      config = require('./config.json'),
      Discord = require('discord.js');

const bot = new Discord.Client();

bot.on('ready', () => console.log('Bot is live!'));

bot.on('message', (msg) => {
    const prefix = '.';
    if (msg.content.startsWith(prefix))
        handleCommand(msg, prefix);
});

bot.login(config.token);