const config = require('../../config.json')
      express = require('express'),
      OAuthClient = require('disco-oauth');

const AuthClient = new OAuthClient(config.bot.id, config.bot.secret);
      router = express.Router();

const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${config.bot.id}&permissions=8&scope=bot`,
      loginURL = `https://discord.com/api/oauth2/authorize?client_id=${config.bot.id}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope=identify%20guilds&prompt=none`;

AuthClient.setRedirect(`${config.dashboard.url}/auth`);
AuthClient.setScopes('identify', 'guilds');

router.use(async (req, res, next) => {
  const key = req.cookies.get('key');
  if (key)
    res.locals.user = await AuthClient.getUser(key);

  next();
});

router.get('/', (req, res) => res.render('home'));
router.get('/commands', (req, res) => res.render('commands'));

router.get('/dashboard', (req, res) => {
  res.render('dashboard/index');
});

router.get('/invite', (req, res) => res.redirect(inviteURL));
router.get('/login', (req, res) => res.redirect(loginURL));

router.get('/auth', async (req, res) => {
  const key = await AuthClient.getAccess(req.query.code);
  res.cookies.set('key', key);  
  res.redirect('/dashboard')
});
router.get('/logout', (req, res) => {
  res.cookies.set('key', null);
  res.redirect('/');
});

router.get('*', (req, res) => res.render('errors/404'));

module.exports = router;