const Event = require('./event');
const { handleCommand } = require('../command-handler');
const logs = require('../../data/logs');

module.exports = class extends Event {
  on = 'message';
  
  async invoke(msg) {
    const command = await handleCommand(msg);
    (command)
      ? await logs.add(msg.guild.id, 'commands')
      : await logs.add(msg.guild.id, 'messages');
  }
}
