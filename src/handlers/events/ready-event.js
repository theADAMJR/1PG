import Event from './event.js';
import { bot } from '../../bot.js';
import { CommandHandler } from '../command-handler.js';

export default class extends Event {
  on = 'ready';

  constructor() {
    super();
    this.commandHandler = new CommandHandler();
  }

  async invoke() {
    console.log(`${bot.user.username} is online`);

    await this.commandHandler.init();
  }
}
