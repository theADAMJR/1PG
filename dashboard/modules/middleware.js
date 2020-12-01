const sessions = require('./sessions');
const { sendError } = require('./api-utils');
const bot = require('../../bot');
const musicHandler = require('../../handlers/music-handler');

module.exports.updateGuilds = async (req, res, next) => {
  try {
    const key = res.cookies.get('key')
      ?? req.get('Authorization');
    if (key) {
      const { guilds } = await sessions.get(key);
      res.locals.guilds = guilds;
    }
  } finally {
    return next();
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const key = res.cookies.get('key')
      ?? req.get('Authorization');
    if (key) {
      const { authUser } = await sessions.get(key);
      res.locals.user = authUser;
    }
  } finally {
    return next();
  }
};

module.exports.updateMusicPlayer = async (req, res, next) => {
  try {
    const requestor = bot.guilds.cache
      .get(req.params.id)?.members.cache
      .get(res.locals.user.id)
    if (!requestor)
      throw new TypeError('You shall not pass.');

    res.locals.requestor = requestor;
    res.locals.player = musicHandler.get({
      guildId: req.params.id,
      voiceChannel: requestor.voice.channel
    });

    return next();    
  } catch (error) {
    sendError(res, { message: error?.message });
  }
};

module.exports.validateGuild = async (req, res, next) => {
  res.locals.guild = res.locals.guilds.find(g => g.id === req.params.id);
  return (res.locals.guild)
    ? next()
    : res.render('errors/404');
};

module.exports.validateUser = async (req, res, next) => {
  return (res.locals.user)
    ? next()
    : res.render('errors/401');
};