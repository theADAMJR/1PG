const permissionConstants = {
  1: 'CREATE_INSTANT_INVITE',
  2: 'KICK_MEMBERS',
  4: 'BAN_MEMBERS',
  8: 'ADMINISTRATOR',
  0x10: 'MANAGE_CHANNELS',
  0x20: 'MANAGE_GUILD',
  0x40: 'ADD_REACTION',
  0x80: 'VIEW_AUDIT_LOG',
  0x400: 'VIEW_CHANNEL',
  0x800: 'SEND_MESSAGES',
  0x1000: 'SEND_TTS_MESSAGES',
  0x2000: 'MANAGE_MESSAGES',
  0x4000: 'EMBED_LINKS',
  0x8000: 'ATTACH_FILES',
  0x10000: 'READ_MESSAGES_HISTORY',
  0x20000: 'MENTION_EVERYONE',
  0x40000: 'USE_EXTERNAL_EMOJIS',
  0x100000: 'CONNECT',
  0x200000: 'SPEAK',
  0x400000: 'MUTE_MEMBERS',
  0x800000: 'MANAGE_NICKNAMES',
  0x1000000: 'MANAGE_ROLES',
  0x2000000: 'MANAGE_WEBHOOKS',
  0x4000000: 'MANAGE_EMOJIS'
};
/**
 * A guild of the discord user who has authorized your app to have access to their data.
 *
 * @property {String} id The guild's unique discord ID.
 * @property {String} name The guild's visible name.
 * @property {String} iconHash The guild's icon hash.
 * @property {Array<String>} features A list of the discord-enabled features of the guild.
 * @property {Boolean} isOwner Whether the authorized user is the guild's owner.
 * @property {Array<String>} permissions A list of permissions that the authorized user has in this guild.
 * @property {Number} createdTimestamp The timestamp of creation of the user's account.
 * @property {Date} createdAt The time of creation of the user's account.
 *
 * @method iconUrl returns the guild's icon's URL.
 */
class Guild {
  constructor({ id, name, icon, features = [], owner = false, permissions = 0 }) {
    this._id = id;
    this._name = name;
    this._iconHash = icon;
    this._features = features;
    this._isOwner = owner;
    this._permissions = this._parsePermissions(permissions);
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get iconHash() {
    return this._iconHash;
  }
  get features() {
    return this._features;
  }
  get isOwner() {
    return this._isOwner;
  }
  get permissions() {
    return this._permissions;
  }
  get createdTimestamp() {
    return parseInt(BigInt('0b' + parseInt(this._id).toString(2)) >> 22n) + 1420070400000;
  }
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  _parsePermissions(perms) {
    let p = [];
    for (let c of Object.keys(permissionConstants)) {
      let x = parseInt(c);
      if ((x & perms) === x) {
        p.push(permissionConstants[x]);
      }
    }
    return p;
  }

  /**
   * Returns a url to the guild icon.
   * @param {number} size The size of the icon in pixels. (Defaults to 512)
   * @returns {string}
   */
  iconUrl(size = 512) {
    return `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.${
      this.iconHash.startsWith('a_') ? 'gif' : 'png'
    }?size=${size}`;
  }
}

/**
 * A collection of Guild objects.
 */
class Guilds extends Map {
  /**
   * @param {Array<Object>} guilds
   */
  constructor(guilds) {
    super();
    for (let g of guilds) {
      this.set(g.id, new Guild(g));
    }
    this.set = null;
    this.clear = null;
    this.delete = null;
  }

  toJSON() {
    let otr = {};
    this.forEach((g, k) => {
      otr[k] = g;
    });
    return otr;
  }
}

module.exports = Guilds;
