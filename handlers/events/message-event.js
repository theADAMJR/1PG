const Event = require('./event');
const { handleCommand } = require('../command-handler');
const guilds = require('../../data/guilds');
const users = require('../../data/users');

module.exports = class extends Event {
  on = 'message';

  async invoke(msg) {
    if (!msg?.guild) return;

    const savedGuild = await guilds.get(msg.guild);

    const prefix = savedGuild.general.prefix;
    if (msg.content.startsWith(prefix))
      return handleCommand(msg, prefix);

    await this.logUserMessage(msg.author);
  }

  async logUserMessage(user) {
    const savedUser = await users.get(user);
    savedUser.messages++;
    await savedUser.save();
  }
}