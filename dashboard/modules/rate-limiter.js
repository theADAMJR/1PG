const rateLimit = require('express-rate-limit');
const RateLimitStore = require('rate-limit-mongo');
const config = require('../../config.json');

module.exports = rateLimit({
  max: 300,
  message: 'You are being rate limited.',
  store: new RateLimitStore({ uri: config.mongoURI }),
  windowMs: 60 * 1000
});
