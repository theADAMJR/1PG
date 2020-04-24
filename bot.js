const Discord = require('discord.js'),
      fs = require('fs');

const bot = new Discord.Client();

bot.commands = new Map();

const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const Command = require(`./commands/${file}`);
    const command = new Command();
    if (!command.name) continue;

    bot.commands.set(command.name, command);
}

bot.on('ready', () => console.log('Bot is live!'));

bot.on('message', (msg) => {
    const prefix = '.';
    if (msg.content.startsWith(prefix))
        handleCommand(msg);
});

function handleCommand(msg) {
    const commandName = msg.content
        .substring(1, msg.content.length)
        .split(' ')[0];
    
    const command = bot.commands.get(commandName);
    if (!command) return;

    try {
        command.execute(msg);
    } catch (error) {
        msg.reply(`⚠ ${error}`);
    }
}

bot.login('NzAwMjcxMDY4ODUzODI5NzAz.XpltsA.VzAnD93T7E00C3tdRc2LUkwdpIE');
