const { handleCommand } = require('./handlers/command-handler'),
      config = require('./config.json'),
      Discord = require('discord.js'),
      guilds = require('./data/guilds'),
      users = require('./data/users'),
      { connect } = require('mongoose');

require('./dashboard/server');

const bot = new Discord.Client();

bot.on('ready', () => console.log('Bot is live! :)'));

bot.on('message', async(msg) => {
    if (!msg.guild) return;

    const savedGuild = await guilds.get(msg.guild);

    const prefix = savedGuild.general.prefix;
    if (msg.content.startsWith(prefix))
        return handleCommand(msg, prefix);

    await logUserMessage(msg.author);
});

async function logUserMessage(user) {
    const savedUser = await users.get(user);
    savedUser.messages++;
    await savedUser.save();
}

bot.login(config.token);

connect(config.mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db! :)'));