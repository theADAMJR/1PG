const config = require('../config.json'),
      express = require('express');




router.get('/dashboard', async (req, res) => {
  const key = req.cookies.get('key');
  const guilds = await AuthClient.getGuilds(key);  
  res.render('dashboard/index', { guilds: guilds.toJSON() });
});

router.get('/servers/:id', async (req, res) => {
  const key = req.cookies.get('key');
  const guilds = await AuthClient.getGuilds(key);

  const guild = guilds.get(req.params.id);
  const savedGuild = await guilds.get(guild);
  res.render('dashboard/show', { guild, savedGuild });
});