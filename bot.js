const { Client } = require('discord.js');
const { token } = require('./config.json');

const bot = new Client();

bot.login(token);

module.exports = bot;

require('./handlers/event-handler');