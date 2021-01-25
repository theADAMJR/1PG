const Event = require('./event');
const { handleCommand } = require('../command-handler');
const logs = require('../../data/logs');
const users = require('../../data/users');

module.exports = class extends Event {
  on = 'message';
  
  async invoke(msg) {
    const command = await handleCommand(msg);
    if (command)
      return await logs.add(msg.guild.id, 'commands');
    
    await logs.add(msg.guild.id, 'messages');

    const savedUser = await users.get(msg.author.id);
    savedUser.coins += 5;
    await savedUser.save();
  }
}
