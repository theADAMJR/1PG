const express = require('express');
const { validateGuild } = require('../modules/middleware');
const log = require('../modules/audit-logger');
const guilds = require('../../data/guilds');

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', validateGuild,
  async (req, res) => res.render('dashboard/show', {
    savedGuild: await guilds.get(req.params.id)
  }));

router.put('/servers/:id/:module', validateGuild, async (req, res) => {
  try {
    const { id, module } = req.params;

    const savedGuild = await guilds.get(id);

    await log.change(id, {
      module,
      by: res.locals.user.id,
      old: {...req.body},
      new: {...savedGuild[module]}
    });
    
    savedGuild[module] = req.body;
    await savedGuild.save();

    res.redirect(`/servers/${id}`);
  } catch {
    res.render('errors/400');
  }
});

module.exports = router;