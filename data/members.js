const SavedUser = require('./models/user');

module.exports = new class {
    async get({ id, guild }) {
        return await SavedUser.findOne({ userId: id, guildId: guild.id })
            || await new SavedUser({ userId: id, guildId: guild.id }).save();
    }
}