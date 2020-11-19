const Event = require('./event');
const logs = require('../../data/logs');

module.exports = class extends Event {
  on = 'guildMemberRemove';
  
  async invoke(msg) {
    await logs.add(msg.guild.id, 'leaves');
  }
}
