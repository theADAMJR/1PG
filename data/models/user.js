const { model } = require('mongoose');

module.exports = model('user', {
    _id: String,
    messages: Number
});