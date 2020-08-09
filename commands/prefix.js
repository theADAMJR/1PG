const Command = require('./command');
const guilds = require('../data/guilds');

module.exports = class extends Command {
  name = 'prefix';
  
  async execute(msg, value) {
    const savedGuild = await guilds.get(msg.guild.id);

    if (!value)
      return msg.channel.send(`Prefix is \`${savedGuild.general.prefix}\``);

    savedGuild.general.prefix = value;
    await savedGuild.save();

    return msg.channel.send(`Prefix is now \`${value}\``);
  }
}