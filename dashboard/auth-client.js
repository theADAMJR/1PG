const config = require('../config.json'),
      OAuthClient = require('disco-oauth');

const AuthClient = new OAuthClient(config.bot.id, config.bot.secret);

AuthClient.setRedirect(`${config.dashboard.url}/auth`);
AuthClient.setScopes('identify', 'guilds');

module.exports = AuthClient;