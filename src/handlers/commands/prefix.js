import Command from './command.js';
import Deps from '../../utils/deps.js';
import { Guilds } from '../../data/guilds.js';

export default class extends Command {
  name = 'prefix';

  constructor() {
    super();
    this.guilds = Deps.get(Guilds);
  }

  async execute(msg, value) {
    const savedGuild = await this.guilds.get(msg.guild.id);
    if (!value) 
      return await msg.reply(`Prefix is \`${savedGuild.prefix}\``);
    
    savedGuild.prefix = value;
    await savedGuild.save();

    await msg.reply(`Prefix is now \`${value}\``)
  }
}
