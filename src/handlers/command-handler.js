import { readdirSync } from 'fs';

export class CommandHandler {
  commands = new Map();

  async init() {
    const fileNames = readdirSync(`./src/handlers/commands`);
    for (const fileName of fileNames) {
      const { default: Command } = await import(`./commands/${fileName}`);
      const command = new Command();
      if (!command.name) continue;

      this.commands.set(command.name, command);
    }
    console.log(`Loaded ${this.commands.size} commands`);
  }

  async handle(prefix, msg) {
    try {
      const args = msg.content
        .slice(prefix.length)
        .split(' ')
        .slice(1);
  
      const name = msg.content
        .slice(prefix.length)
        .split(' ')[0];
  
      await this.commands
        .get(name)
        ?.execute(msg, ...args);      
    } catch (error) {
      await msg.reply(`⚠️ ${error.message}`);
    }
  }
}
