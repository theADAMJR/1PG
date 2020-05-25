const SavedGuild = require('./models/guild');

module.exports = new class {
    async get({ id }) {
        if (!id) return null;

        return await SavedGuild.findById(id)
            || await new SavedGuild({ _id: id }).save();
    }
}