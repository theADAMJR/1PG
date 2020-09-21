const OAuthClient = require('disco-oauth');
const config = require('../../config.json');

const client = new OAuthClient(config.bot.id, config.bot.secret);
client.setRedirect(`${config.dashboardURL}/auth`);
client.setScopes('identify', 'guilds');

module.exports = client;