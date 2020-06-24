const { model } = require('mongoose');

module.exports = model('member', {
    guildId: String,
    userId: String
});