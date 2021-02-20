const Event = require('./event');
const logs = require('../../data/logs');

module.exports = class extends Event {
  on = 'guildMemberAdd';
  
  async invoke(msg) {
    await logs.add(msg.guild.id, 'joins');
  }
}
