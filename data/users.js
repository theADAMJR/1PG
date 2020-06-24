const SavedUser = require('./models/user');

module.exports = new class {
    async get({ id }) {
        return await SavedUser.findById(id)
            || await new SavedUser({ _id: id }).save();
    }
}