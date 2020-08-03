const fs = require('fs');
const path = require('path');
const bot = require('../bot');

const eventFiles = fs
  .readdirSync(path.dirname(require.main.filename) + '/handlers/events')
  .filter(file => file.endsWith('.js'));

for (const fileName of eventFiles) {
  const Event = require(`./events/${fileName}`);
  const event = new Event();
  if (!event.on) continue;

  bot.on(event.on, event.invoke.bind(this));
}
console.log(`Loaded ${eventFiles.length} events`);