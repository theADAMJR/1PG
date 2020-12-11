class HTMLMusicWrapper {
  #music;

  set apiError(error) {
    console.log(error);
  }

  constructor(musicClient) {
    this.#music = musicClient;
  }
  
  updateList() {
    $('.track-list').html(
      (this.#music.list.length <= 0)
        ? '<p>No tracks here.</p>'
        : this.#music.list
        .map(track => this.#htmlTrack(track))
        .join()
    );
  }

  #htmlTrack(track) {
    return `
      <div class="track d-flex justify-content-between">
        <span>
          <img class="float-left mr-3" src="${track.thumbnail}" />
          <h5 class="mt-0">${track.title}</h5>
          <p class="lead">${track.author.name}</p>
        </span>
        <div class="float-right">
          <span class="text-muted">${track.duration.timestamp}</span>
            <button class="remove btn text-danger">x</button>
        </div>
      </div>
    `;
  }
}
