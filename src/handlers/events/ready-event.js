import Event from './event.js';
import { bot } from '../../bot.js';

export default class extends Event {
  on = 'ready';

  async invoke() {
    console.log(`${bot.user.username} is online`);
  }
}
