const AuthClient = require('../auth-client'),
      bot = require('../../bot'),
      express = require('express'),
      guilds = require('../../data/guilds');

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  const key = req.cookies.get('key');
  const authGuilds = await AuthClient.getGuilds(key); 
  const manageableGuilds = getManageableGuilds(authGuilds); 
  res.render('dashboard/index', { guilds: manageableGuilds });
});

router.get('/servers/:id', async (req, res) => {
  const key = req.cookies.get('key');
  const authGuilds = await AuthClient.getGuilds(key);
  
  const manageableGuilds = getManageableGuilds(authGuilds);
  if (!manageableGuilds.some(g => g.id === req.params.id))
    return res.render('errors/404');

  console.log(bot);
  const guild = bot.guilds.cache.get(id);
  
  const savedGuild = await guilds.get(authGuild);

  res.render('dashboard/show', { guild, savedGuild });
});

function getManageableGuilds(guilds) {
  const manageableGuilds = [];
  for (const id of guilds.keys()) {
    const guild = guilds.get(id);
    if (guild.permissions.includes('MANAGE_GUILD'))
      manageableGuilds.push(guild);
  }
  return manageableGuilds;  
}

module.exports = router;