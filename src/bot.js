import { config } from 'dotenv';
config({ path: '.env' });

import { Client } from 'discord.js';
import { EventHandler } from './handlers/event-handler.js';

export const bot = new Client();

new EventHandler().init();

bot.login(process.env.BOT_TOKEN);
