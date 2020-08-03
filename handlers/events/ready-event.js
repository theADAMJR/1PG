const Event = require('./event');

module.exports = class extends Event {
  on = 'ready';

  invoke() {
    console.log(`Bot is live! :)`)
  }
}