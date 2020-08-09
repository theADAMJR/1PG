const Event = require('./event');
const bot = require('../../bot');

module.exports = class extends Event {
  on = 'ready';
  
  invoke() {
    console.log(`Logged in as ${bot.user.username}`);
  }
}