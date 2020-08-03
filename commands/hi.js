const Command = require('./command');

module.exports = class extends Command {
    name = 'hi';

    execute(msg) {
        msg.reply('Hi!');
    }
}
