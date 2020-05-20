const { model } = require('mongoose');

class GeneralModule {
    prefix = '.';
}

module.exports = model('guild', {
    _id: String,
    general: { type: Object, default: new GeneralModule() }
});