const { handleCommand } = require('./handlers/command-handler'),
      config = require('./config.json'),
      Discord = require('discord.js'),
      guilds = require('./data/guilds'),
      { connect } = require('mongoose');

const bot = new Discord.Client();

bot.on('ready', () => console.log('Bot is live! :)'));

bot.on('message', async(msg) => {
    if (!msg.guild) return;

    const savedGuild = await guilds.get(msg.guild.id);

    const prefix = savedGuild.general.prefix;
    if (msg.content.startsWith(prefix))
        handleCommand(msg, prefix);
});

bot.login(config.token);

connect(config.mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db! :)'));