import Event from './event.js';

export default class extends Event {
  on = 'message';

  async invoke(msg) {
    if (msg.author.bot) return;
  
    await msg.reply('Hi');    
  }
}
