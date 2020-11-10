const { model } = require('mongoose');

module.exports = model('log', {
  _id: String,
  changes: { type: Array, default: [] }
});