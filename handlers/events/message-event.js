const Event = require('./event');
const { handleCommand } = require('../command-handler');

module.exports = class extends Event {
  on = 'message';
  
  invoke(msg) {
    handleCommand(msg);
  }
}