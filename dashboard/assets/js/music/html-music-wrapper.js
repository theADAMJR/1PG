class HTMLMusicWrapper {
  #music;

  set apiError(error) {
    if (!error)
      return $('#musicAPIError').addClass('d-none');
      
    $('#musicAPIError').removeClass('d-none');
    $('#musicAPIError').text(error.message ?? 'Unknown error.');
  }

  constructor(musicClient) {
    this.#music = musicClient;
  }
  
  updateList() {
    $('.now-playing').html(this.#nowPlaying());

    $('.track-list').html(
      (this.#music.list.length <= 0)
        ? '<p>No tracks here.</p>'
        : this.#music.list
        .map(this.#htmlTrack)
        .join()
    );

    $('.track .remove').on('click', async () => {
      const index = $('.track .remove').index('.remove');
      await this.#music.remove(index);
    });
  }

  #nowPlaying() {
    if (this.#music.list.length <= 0) return ``;

    const track = this.#music.list[0];
    return `
      <img class="float-left mr-3" src="${track.thumbnail}">
      <h4>${track.title}</h4>
      <p class="lead">${track.author.name}</p>
    `;
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
