const fs = require('fs');
const bot = require('../bot');

const fileNames = fs.readdirSync('./handlers/events');
for (let fileName of fileNames) {
  const Event = require(`./events/${fileName}`);
  const event = new Event();
  if (!event.on) continue;

  bot.on(event.on, event.invoke.bind(event));
}
console.log(`Loaded ${fileNames.length - 1} events`);
