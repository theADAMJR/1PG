import { config } from 'dotenv';
config({ path: '.env' });

import mongoose from 'mongoose';
import { Client, Intents } from 'discord.js';
import { EventHandler } from './handlers/event-handler.js';
import Deps from './utils/deps.js';

export const bot = Deps.add(Client, new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}));

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useNewUrlParser: true,
}, (error) => (error)
  ? console.log('Failed to connect to database')
  : console.log('Connected to database'));

Deps.get(EventHandler).init();

bot.login(process.env.BOT_TOKEN);
