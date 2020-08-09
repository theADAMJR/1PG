const { Client } = require('discord.js');
const { token } = require('./config.json');
const mongoose = require('mongoose');
const config = require('./config.json');

const bot = new Client();

bot.login(token);

mongoose.connect(config.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => error
  ? console.log('Failed to connect to database')
  : console.log('Connected to database'));

module.exports = bot;

require('./handlers/event-handler');