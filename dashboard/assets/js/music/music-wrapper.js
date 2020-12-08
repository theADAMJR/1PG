class MusicWrapper {
  #endpoint = `/api/guilds/${guildId}/music`;
  #html = new HTMLMusicWrapper(this);

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
    }
  }

  async play(query) {
    await this.#fetch(`play?q=${query}`);
    await this.updateList();
  }

  async stop() {
    await this.#fetch(`stop`);
    await this.updateList();
  }

  async updateList() {
    console.log('update list');
  }
}
