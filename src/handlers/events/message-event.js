import Event from './event.js';
import { CommandHandler } from '../command-handler.js';
import Deps from '../../utils/deps.js';
import { Guilds } from '../../data/guilds.js';

export default class extends Event {
  on = 'messageCreate';

  constructor() {
    super();
    this.commandHandler = Deps.get(CommandHandler);
    this.guilds = Deps.get(Guilds);
  }

  async invoke(msg) {
    console.log('we');
    if (!msg.guild || msg.author.bot) return;
  
    const savedGuild = await this.guilds.get(msg.guild.id);
    const prefix = savedGuild.prefix;
    if (msg.content.startsWith(prefix))
      return this.commandHandler.handle(prefix, msg);
  }
}
