const config = require('./config.json');
const { Client } = require('discord.js');
const { connect } = require('mongoose');

const bot = new Client();

bot.login(config.bot.token);

connect(config.mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db! :)'));

module.exports = bot;

require('./dashboard/server');
require('./handlers/event-handler');