const Discord = require('discord.js');

const bot = new Discord.Client();

bot.on('ready', () => console.log('Bot is live!'));

bot.on('message', (msg) => {
    if (msg.author.bot) return;
    
    const prefix = '/';
    if (msg.content === prefix + 'ping') {
        msg.reply('Ping! 🏓');
    }
});

bot.login('NzAwMjcxMDY4ODUzODI5NzAz.XpltsA.VzAnD93T7E00C3tdRc2LUkwdpIE');
