const { model } = require('mongoose');

module.exports = model('user', {
    _id: String,
    messages: { type: Number, default: 0 }
});