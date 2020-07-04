const AuthClient = require('../auth-client'),
      config = require('../../config.json'),
      express = require('express');

const router = express.Router();

const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${config.bot.id}&permissions=8&scope=bot&redirect_uri=${config.dashboard.url}/dashboard`,
      loginURL = `https://discord.com/api/oauth2/authorize?client_id=${config.bot.id}&redirect_uri=${config.dashboard.url}/auth&response_type=code&scope=identify%20guilds&prompt=none`;

router.get('/invite', (req, res) => res.redirect(inviteURL));
router.get('/login', (req, res) => res.redirect(loginURL));

router.get('/auth', async (req, res) => {
  const key = await AuthClient.getAccess(req.query.code);
  res.cookies.set('key', key);  
  res.redirect('/dashboard');
});
router.get('/logout', (req, res) => {
  res.cookies.set('key', null);
  res.redirect('/');
});

module.exports = router;