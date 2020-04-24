module.exports = class {
    name = 'ping';

    execute(msg) {
        msg.reply('Pong!');
    }
}
