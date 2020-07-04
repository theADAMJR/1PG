const fs = require('fs'),
      path = require('path');

const commands = new Map();

const commandFiles = fs
    .readdirSync(path.dirname(require.main.filename) + '/commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const Command = require(`../commands/${file}`);
    const command = new Command();
    if (!command.name) continue;

    commands.set(command.name, command);
}
console.log(`Loaded ${commandFiles.length} commands`);

function handleCommand(msg, prefix) {
    const commandName = msg.content
        .slice(prefix.length)    
    const command = commands.get(commandName);
    if (!command) return;

    try {
        command.execute(msg);
    } catch (error) {
        msg.reply(`⚠ ${error}`);
    }
}

module.exports.handleCommand = handleCommand;