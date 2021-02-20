const Command = require('./command');
const users = require('../data/users');
const economy = require('../modules/economy');
const canvacord = require('canvacord');

module.exports = class extends Command {
  name = 'profile';

  async execute(msg, userMention) {
    const userId = userMention
      ?.replace('<@!', '')
      .replace('>', '') ?? msg.author.id;
    const user = msg.guild.members.cache.get(userId)?.user;
    if (!user)
      throw new TypeError('Member not found');

    const savedUser = await users.get(userId);
    const rank = await economy.getRank(userId, msg.guild.id);

    const buffer = await new canvacord.Rank()
      .setAvatar(user.displayAvatarURL({ format: 'png' }))
      .setBackground('IMAGE', 'https://cdn.pixabay.com/photo/2019/04/30/10/47/background-4168284_960_720.jpg')
      .setCurrentXP(savedUser.coins)
      .setDiscriminator(user.discriminator)
      .setLevel(0, ' ', false)
      .setProgressBar('#C5B358', 'COLOR', false)
      .setProgressBarTrack('#000000')
      .setRank(rank, '#    ', true)
      .setRequiredXP(1_000_000)
      .setUsername(user.username)
      .build();

    await msg.channel.send({
      files: [{
        attachment: buffer,
        name: 'profile.png'
      }]
    });
  }
}
