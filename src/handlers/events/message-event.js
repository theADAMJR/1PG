import { bot } from '../../bot.js';
import { Deps } from '../../utils/deps.js';
import { CommandHandler } from '../command-handler.js';
import { Guilds } from '../../data/guilds.js';
import Event from './event.js';

export default class extends Event {
  on = 'message';
 
  async invoke(msg) {
    console.log(`${bot.user.username} is ready`);

    const { general } = await Deps.get(Guilds).get(msg.guild.id);
    await Deps.get(CommandHandler).handle(general.prefix, msg);
  }
}
