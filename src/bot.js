import { config } from 'dotenv';
config({ path: '.env' });

import { Client } from 'discord.js';
import mongoose from 'mongoose';
import { Deps } from './utils/deps.js';
import { EventHandler } from './handlers/event-handler.js';

mongoose.connect(process.env.MONGO_URI, {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

export const bot = new Client();
bot.login(process.env.BOT_TOKEN);

Deps.get(EventHandler).init(bot);
