const express = require('express');
const { commands } = require('../../handlers/command-handler');
const bot = require('../../bot');
const users = require('../../data/users');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get('/commands', (req, res) => res.render('commands', {
  subtitle: 'Commands',
  categories: [
    { name: 'Auto Mod', icon: 'fas fa-gavel' },
    { name: 'Economy', icon: 'fas fa-coins' }, 
    { name: 'General', icon: 'fas fa-star' },
    { name: 'Music', icon: 'fas fa-music' }
  ],
  commands: Array.from(commands.values()),
  commandsString: JSON.stringify(Array.from(commands.values()))
}));

router.get('/leaderboard/:id', async (req, res) => {
  const guild = bot.guilds.cache.get(req.params.id);
  if (!guild)
    return res.render('errors/404');

  const savedUsers = (await users.getInGuild(req.params.id))
    .sort((a, b) => (a.coins < b.coins) ? 1 : -1)
    .slice(0, 100);

  res.render('dashboard/leaderboard', { guild, savedUsers });
});

module.exports = router;
