import { bot } from '../../bot.js';
import { CommandHandler } from '../command-handler.js';
import { Deps } from '../../utils/deps.js';
import Event from './event.js';

export default class extends Event {
  on = 'ready';

  async invoke() {
    console.log(`${bot.user.username} is ready`);

    await Deps.get(CommandHandler).init();
  }
}
