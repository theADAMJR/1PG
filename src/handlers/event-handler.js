import { readdirSync } from 'fs';
import Deps from '../utils/deps.js';
import { Client } from 'discord.js';

export class EventHandler {
  constructor(bot = Deps.get(Client)) {
    this.bot = bot;
  }

  async init() {
    const fileNames = readdirSync(`./src/handlers/events`);
    for (const fileName of fileNames) {
      const { default: Event } = await import(`./events/${fileName}`);
      const event = new Event();
      if (!event.on) continue;

      this.bot.on(event.on, event.invoke.bind(event));
    }
    console.log(`Listened for ${fileNames.length - 1} events`);
  }
}
