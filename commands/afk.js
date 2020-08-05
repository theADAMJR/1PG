const Command = require('./command');

module.exports = class extends Command {
  name = 'idle';
  
  execute(msg) {
    const details = msg.guild.members.cache
      .filter(m => m.presence.status === 'idle')
      .map(m => m.id)
      .join('\n');

    return msg.channel.send(`Members: ${details}`);
  }
}
