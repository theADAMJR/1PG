const sessions = require('./sessions');

module.exports.updateGuilds = async (req, res, next) => {
  try {
    const key = res.cookies.get('key');
    if (key) {
      const { guilds } = await sessions.get(key);
      res.locals.guilds = guilds;
    }
  } finally {
    next();
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const key = res.cookies.get('key');
    if (key) {
      const { authUser } = await sessions.get(key);
      res.locals.user = authUser;
    }
  } finally {
    next();
  }
};

module.exports.validateUser = async (req, res, next) => {
  res.locals.user
    ? next()
    : res.render('errors/401');
};