$(async () => {
  const music = new MusicWrapper();

  $('#stopTrack').on('click', () => music.stop());
  $('#trackSearch').on('click', async () => {
    const query = $('.q-control input').val();
    await music.play(query);
  });
});
