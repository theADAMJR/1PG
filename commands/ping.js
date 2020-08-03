const Command = require('./command');

module.exports = class extends Command {
    name = 'ping';

    execute(msg) {
        msg.reply('Pong!');
    }
}
