const AuthClient = require('../auth-client'),
      bot = require('../../bot'),
      express = require('express'),
      guilds = require('../../data/guilds'),
      { setUser, validateUser } = require('../middleware');

const router = express.Router();

router.get('/dashboard', setUser, validateUser, async (req, res) => {
  const key = req.cookies.get('key');
  const authGuilds = await AuthClient.getGuilds(key); 
  const manageableGuilds = getManageableGuilds(authGuilds); 
  res.render('dashboard/index', { guilds: manageableGuilds });
});

router.get('/servers/:id', setUser, validateUser, async (req, res) => {
  const key = req.cookies.get('key');
  const authGuilds = await AuthClient.getGuilds(key);
  
  const manageableGuilds = getManageableGuilds(authGuilds);
  if (!manageableGuilds.some(g => g.id === req.params.id))
    return res.render('errors/404');

  const guild = bot.guilds.cache.get(req.params.id); 
  if (!guild)
    return res.render('errors/404');

  const savedGuild = await guilds.get(guild);
  res.render('dashboard/show', { guild, savedGuild });
});

router.put('/servers/:id/:module', async (req, res) => {
  const { id, module } = req.params;  

  const key = req.cookies.get('key');
  const authGuilds = await AuthClient.getGuilds(key);
  
  const manageableGuilds = getManageableGuilds(authGuilds);
  if (!manageableGuilds.some(g => g.id === id))
    return res.render('errors/404');

  const savedGuild = await guilds.get({ id });
  savedGuild[module] = req.body;
  await savedGuild.save();
  
  res.redirect(`/servers/${id}`);
});

function getManageableGuilds(guilds) {
  const manageableGuilds = [];
  for (const id of guilds.keys()) {
    const authGuild = guilds.get(id);
    const canManage = authGuild.permissions.includes('MANAGE_GUILD');
    if (bot.guilds.cache.has(id) && canManage)
      manageableGuilds.push(authGuild);
  }
  return manageableGuilds;  
}

module.exports = router;