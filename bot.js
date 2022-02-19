const { config } = require('dotenv');
config({ path: '.env' });

const { Client } = require('discord.js');
const mongoose = require('mongoose');

const bot = new Client();

bot.login(process.env.BOT_TOKEN);

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => error
    ? console.log('Failed to connect to database')
    : console.log('Connected to database'));

module.exports = bot;

require('./handlers/event-handler');
require('./dashboard/server');
