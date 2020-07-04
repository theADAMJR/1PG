const jwt = require('jsonwebtoken'),
  phin = require('phin');
const User = require('./types/user'),
  Guilds = require('./types/guild'),
  Connections = require('./types/connection');
const APIError = require('./errors/api');

/**
 * @typedef {('bot'|'connections'|'email'|'identify'|'guilds'|'guilds.join'|'gdm.join'|'messages.read'|'rpc'|'rpc.api'|'rpc.notifications.read'|'webhook.incoming')} Scope
 */
const scopesList = [
  'bot',
  'connections',
  'email',
  'identify',
  'guilds',
  'guilds.join',
  'gdm.join',
  'messages.read',
  'rpc',
  'rpc.api',
  'rpc.notifications.read',
  'webhook.incoming'
];

module.exports = class Client {
  /**
   * Create a new OAuth2 Client.
   * @param {String} clientId
   * @param {String} clientSecret
   */
  constructor(clientId, clientSecret) {
    this._id = clientId;
    this._secret = clientSecret;
    this._baseUrl = 'https://discordapp.com/api/';
    this.scopes = [];
    this.redirectURI = '';
  }

  /**
   * Set the scopes for future requests
   * @param {Scope} scopes
   */
  setScopes(...scopes) {
    if (scopes.length < 1) throw new Error('No scopes provided.');
    else {
      this.scopes = [];
      for (let i of scopes) {
        if (scopesList.includes(i.toLowerCase().trim())) {
          if (!this.scopes.includes(i.toLowerCase().trim())) this.scopes.push(i.toLowerCase().trim());
        } else throw new Error('Invalid scope provided - ' + i);
      }
      return this;
    }
  }

  /**
   * Set the redirect URI for future requests.
   * @param {String} redirectUri
   */
  setRedirect(redirectUri) {
    if (redirectUri.startsWith('http://') || redirectUri.startsWith('https://')) this.redirectURI = redirectUri;
    else throw new Error('Invalid redirect URI provided.');
    return this;
  }

  /**
   * Generates a authorization code link depending on the scopes and redirect URI set.
   * @returns {String}
   */
  get authCodeLink() {
    if (this.scopes.length > 0 && this.redirectURI !== '')
      return `https://discordapp.com/oauth2/authorize?response_type=code&client_id=${this._id}&scope=${this.scopes.join(
        '%20'
      )}&redirect_uri=${this.redirectURI}`;
    else if (this.scopes.length < 1) throw new Error('scopes are not defined.');
    else if (this.redirectURI === '') throw new Error('redirect URI is not defined');
  }

  /**
   * Gets the access token for the user to perform further functions.
   * @param {String} code
   * @returns {Promise<String>}
   */
  async getAccess(code) {
    return new Promise(async (resolve, reject) => {
      if (typeof code !== 'string' && code === '') reject(new Error('Authorisation code not provided.'));
      try {
        const response = await phin({
          method: 'POST',
          url: `${this._baseUrl}oauth2/token`,
          parse: 'json',
          form: {
            client_id: this._id,
            client_secret: this._secret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirectURI,
            scope: this.scopes.join(' ')
          }
        });
        if (response.statusCode === 200) {
          let token = response.body;
          token['expireTimestamp'] = Date.now() + token['expires_in'] * 1000 - 10000;
          resolve(jwt.sign(token, this._secret), { expiresIn: token['expires_in'] });
        } else reject(new APIError(response.statusCode));
      } catch (err) {
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse'].statusCode));
      }
    });
  }

  /**
   * Gets a new access token for the user whose access token has expired.
   * @param key
   * @returns {Promise<String>}
   */
  async refreshToken(key) {
    return new Promise(async (resolve, reject) => {
      let access;
      try {
        access = jwt.verify(key, this._secret);
      } catch (err) {
        reject(new Error('Invalid key provided'));
      }
      let refresh = access['refresh_token'];
      try {
        const response = await phin({
          url: `${this._baseUrl}oauth2/token`,
          method: 'POST',
          parse: 'json',
          form: {
            client_id: this._id,
            client_secret: this._secret,
            grant_type: 'refresh_token',
            refresh_token: refresh,
            redirect_uri: this.redirectURI,
            scope: this.scopes.join(' ')
          }
        });
        if (response.statusCode === 200) {
          let token = response.body;
          token['expireTimestamp'] = Date.now() + token['expires_in'] * 1000 - 10000;
          resolve(jwt.sign(token, this._secret), { expiresIn: token['expires_in'] });
        } else reject(new APIError(response.statusCode));
      } catch (err) {
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse'].statusCode));
      }
    });
  }

  /**
   * Gets the user who has authorized using the OAuth2 flow.
   * @param {String} key
   * @returns {Promise<User>}
   */
  async getUser(key) {
    return new Promise(async (resolve, reject) => {
      let access;
      try {
        access = jwt.verify(key, this._secret);
      } catch (err) {
        reject(new Error('Invalid key provided.'));
      }
      let token = access['access_token'],
        type = access['token_type'];
      try {
        const response = await phin({
          url: `${this._baseUrl}users/@me`,
          method: 'GET',
          headers: { Authorization: `${type} ${token}` },
          parse: 'json'
        });
        if (response.statusCode === 200) resolve(new User(response.body));
        else reject(new APIError(response.statusCode));
      } catch (err) {
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse'].statusCode));
      }
    });
  }

  /**
   * Gets the guilds of an authorized user.
   * @param {String} key
   * @returns {Promise<Array<Object>>}
   */
  async getGuilds(key) {
    return new Promise(async (resolve, reject) => {
      let access;
      try {
        access = jwt.verify(key, this._secret);
      } catch (err) {
        reject(new Error('Invalid key provided'));
      }
      let token = access['access_token'],
        type = access['token_type'];
      try {
        const response = await phin({
          url: `${this._baseUrl}users/@me/guilds`,
          method: 'GET',
          headers: { Authorization: `${type} ${token}` },
          parse: 'json'
        });
        if (response.statusCode === 200) resolve(new Guilds(response.body));
        else reject(new APIError(response.statusCode));
      } catch (err) {
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse'].statusCode));
      }
    });
  }

  /**
   * Gets the connected third-party accounts of an authorized user.
   * @param {String} key
   * @returns {Promise<Array<Object>>}
   */
  async getConnections(key) {
    return new Promise(async (resolve, reject) => {
      let access;
      try {
        access = jwt.verify(key, this._secret);
      } catch (err) {
        reject(new Error('Invalid key provided.'));
      }
      let token = access['access_token'],
        type = access['token_type'];
      try {
        const response = await phin({
          url: `${this._baseUrl}users/@me/connections`,
          method: 'GET',
          headers: { Authorization: `${type} ${token}` },
          parse: 'json'
        });
        if (response.statusCode === 200) resolve(new Connections(response.body));
        else reject(new APIError(response.statusCode));
      } catch (err) {
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse'].statusCode));
      }
    });
  }
};
