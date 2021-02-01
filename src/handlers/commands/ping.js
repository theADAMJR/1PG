import Command from './command.js';

export default class extends Command {
  name = 'ping';

  async execute(msg) {
    await msg.reply(`🏓 Pong! \`${msg.client.ws.ping}ms\``);
  }
}
