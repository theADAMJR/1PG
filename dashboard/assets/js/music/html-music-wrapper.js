class HTMLMusicWrapper {
  #music;

  set apiError(error) {
    console.log(error);
  }

  constructor(musicClient) {
    this.#music = musicClient;
  }
}
