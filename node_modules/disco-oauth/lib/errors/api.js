/**
 * A list of the commonly occurring errors.
 * @type {Map<number, string>}
 */
const errors = new Map([
  [400, 'Invalid request made'],
  [401, 'Invalid access token'],
  [403, 'Not enough permissions'],
  [404, 'Resource not found'],
  [405, 'Method not allowed'],
  [429, 'You are being rate limited'],
  [502, 'Server busy, retry after a while']
]);

module.exports = class APIError extends Error {
  constructor(code, ...params) {
    super(...params);
    this.statusCode = code;
    this.message = errors.get(code) || 'An error occurred';
  }
};
