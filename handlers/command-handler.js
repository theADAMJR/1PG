const fs = require('fs');
const guilds = require('../data/guilds');

const commands = new Map();

const fileNames = fs.readdirSync('./commands');
for (let fileName of fileNames) {
  const Command = require(`../commands/${fileName}`);
  const command = new Command();
  if (!command.name) continue;

  commands.set(command.name, command);
}
console.log(`Loaded ${commands.size} commands`);

async function handleCommand(msg) {
  const savedGuild = await guilds.get(msg.guild.id);
  const prefix = savedGuild.general.prefix;

  const channelIsBlacklisted = savedGuild.general.blacklistedChannelIds
    .includes(msg.channel.id);
  if (channelIsBlacklisted)
    return false;

  if (!msg.content.startsWith(prefix))
    return false;

  const name = msg.content
    .split(' ')[0]
    .slice(prefix.length);

  const args = msg.content
    .split(' ')
    .slice(1);

  const command = commands.get(name);
  try { await command?.execute(msg, ...args); }
  catch (error) {
    msg.channel.send(`⚠ ${error?.message ?? 'Unknown error.'}`);
  }

  return true;
}

module.exports.handleCommand = handleCommand;
module.exports.commands = commands;