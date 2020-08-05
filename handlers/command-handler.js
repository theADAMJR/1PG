const fs = require('fs');

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
  const prefix = '.';
  if (!msg.content.startsWith(prefix))
    return false;

  const slicedContent = msg.content
    .split(' ')[0]
    .slice(prefix.length);

  const command = commands.get(slicedContent);
  try { await command?.execute(msg); }
  catch (error) {
    msg.channel.send(`⚠ ${error?.message ?? 'Unknown error.'}`);
  }

  return true;
}

module.exports.handleCommand = handleCommand;