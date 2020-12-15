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

  async remove(index) {
    try {
      const list = await this.#fetch(`remove?i=${index}`);

      this.#html.apiError = null;
      await this.updateList(list);
    } catch {}
  }

  async shuffle() {
    try {
      const list = await this.#fetch(`shuffle`);

      this.#html.apiError = null;
      await this.updateList(list);
    } catch {}
  }

  async skip() {
    try {
      const list = await this.#fetch(`skip`);

      this.#html.apiError = null;
      await this.updateList(list);
    } catch {}
  }

  async updateList(list = null) {
    this.list = list ?? await this.#fetch('list');
    this.#html.updateList();
  }
}
