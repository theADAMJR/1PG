const { MusicClient } = require('@2pg/music');

module.exports = new class {
  #client = new MusicClient();

  get(options) {
    return this.#client.get(options.guildId)
      ?? this.#client.create(options.guildId, options);
  }
}
