const Command = require('./command');

module.exports = class extends Command {
  name = 'ping';
  
  execute(msg) {
    msg.channel.send('Pong');
  }
}