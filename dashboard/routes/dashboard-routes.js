const bot = require('../../bot'),
      express = require('express'),
      guilds = require('../../data/guilds'),
      { validateGuild } = require('../middleware');

const router = express.Router();

router.get('/dashboard', async (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', validateGuild, async (req, res) => {
  const guild = bot.guilds.cache.get(req.params.id);
  const savedGuild = await guilds.get(guild);
  res.render('dashboard/show', { guild, savedGuild });
});

router.put('/servers/:id/:module', validateGuild, async (req, res) => {
  const { id, module } = req.params;

  const savedGuild = await guilds.get({ id });
  savedGuild[module] = req.body;
  await savedGuild.save();
  
  res.redirect(`/servers/${id}`);
});

module.exports = router;