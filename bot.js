const { handleCommand } = require('./handlers/command-handler'),
      config = require('./config.json'),
      Discord = require('discord.js'),
      guilds = require('./data/guilds'),
      { connect } = require('mongoose');

const bot = new Discord.Client();

bot.on('ready', () => console.log('Bot is live! :)'));

bot.on('message', async(msg) => {
    if (!msg.guild) return;

    const savedGuild = await guilds.get(msg.guild);

    const prefix = savedGuild.general.prefix;
    if (msg.content.startsWith(prefix))
        return handleCommand(msg, prefix);

    await logUserMessage(msg.member);
});

async function logUserMessage(member) {
    const savedMember = await members.get(member);
    savedMember.messages++;
    await savedMember.save();
}

bot.login(config.token);

connect(config.mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db! :)'));