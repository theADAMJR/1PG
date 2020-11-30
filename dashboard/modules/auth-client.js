const OAuthClient = require('disco-oauth');

const client = new OAuthClient(process.env.BOT_ID, process.env.BOT_SECRET);
client.setRedirect(`${process.env.DASHBOARD_URL}/auth`);
client.setScopes('identify', 'guilds');

module.exports = client;