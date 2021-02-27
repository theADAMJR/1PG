import { config } from 'dotenv';
config({ path: '.env' });

import { Client } from 'discord.js';
import { EventHandler } from './handlers/event-handler.js';
import Deps from './utils/deps.js';

export const bot = Deps.add(Client, new Client());

Deps.get(EventHandler).init();

bot.login(process.env.BOT_TOKEN);
