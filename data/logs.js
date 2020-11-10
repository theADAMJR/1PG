const SavedLog = require('./models/log');

module.exports = new class {
  async get(id) {
    return await SavedLog.findById(id)
      || await new SavedLog({ _id: id }).save();
  }
}