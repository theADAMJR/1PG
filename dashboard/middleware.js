const AuthClient = require('./auth-client'),
      bot = require('../bot'),
      utils = require('./utils');

module.exports.setUser = async (req, res, next) => {
  res.locals.utils = utils; 

  const key = req.cookies.get('key');
  if (key)
    res.locals.user = await AuthClient.getUser(key);

  return next();
}

module.exports.validateUser = (req, res, next) => {
  return (!res.locals.user)
    ? res.render('errors/401')
    : next();
}

module.exports.updateGuilds = async (req, res, next) => {
  const key = req.cookies.get('key');
  if (key) {
    const authGuilds = await AuthClient.getGuilds(key);
    res.locals.guilds = getManageableGuilds(authGuilds);
  }  
  return next();
}

module.exports.validateGuild = async (req, res, next) => {
  const exists = res.locals.guilds.some(g => g.id === req.params.id);
  return (!exists)
    ? res.render('errors/404')
    : next();
};

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
module.exports.getManageableGuilds = getManageableGuilds;