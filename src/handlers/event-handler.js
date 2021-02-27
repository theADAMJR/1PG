import { readdirSync } from 'fs';

export class EventHandler {
  async init(bot) {
    const fileNames = readdirSync(`./src/handlers/events`);
    for (const fileName of fileNames) {
      const { default: Event } = await import(`./events/${fileName}`);
      const event = new Event();
      if (!event.on) continue;

      bot.on(event.on, event.invoke.bind(event));
    }
    console.log(`Listened for ${fileNames.length - 1} events`);
  }
}
