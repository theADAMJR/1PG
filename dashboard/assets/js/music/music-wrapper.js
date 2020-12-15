class MusicWrapper {
  #endpoint = `/api/guilds/${guildId}/music`;
  #html = new HTMLMusicWrapper(this);

  list = [];

  async #fetch(action) {
    try {
      const res = await fetch(`${this.#endpoint}/${action}`, {
        headers: { Authorization: key }
      });
      const json = await res.json();
      if (!res.ok)
        throw json;

      return json;
    } catch (error) {
      this.#html.apiError = error;
      throw error;
    }
  }

  async play(query) {
    try {
      await this.#fetch(`play?q=${query}`);
      this.#html.apiError = null;
    } catch {}
    await this.updateList();
  }

  async stop() {
    try {
      await this.#fetch(`stop`);
      this.#html.apiError = null;
    } catch {}
    await this.updateList();
  }

  async updateList() {
    this.list = await this.#fetch('list');
    this.#html.updateList();
  }
}
