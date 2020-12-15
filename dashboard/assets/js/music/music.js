$(async () => {
  const music = new MusicWrapper();
  await music.updateList();

  $('#skipTrack').on('click', () => music.skip());
  $('#shuffleList').on('click', () => music.shuffle());
  $('#stopTrack').on('click', () => music.stop());
  $('#trackSearch').on('click', async () => {
    const query = $('.q-control input').val();
    await music.play(query);
  });
});
