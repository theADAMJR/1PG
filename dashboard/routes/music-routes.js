const express = require('express');
const { sendError } = require('../modules/api-utils');

const router = express.Router({ mergeParams: true });

router.get('/play', async (req, res) => {
  try {
    const track = await res.locals.player.play(req.query.q, res.locals.requestor);
    res.json(track);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/stop', async (req, res) => {
  try {
    await res.locals.player.stop();

    res.json({ code: 200, message: 'Success!' });
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/toggle', async (req, res) => {
  try {
    const player = res.locals.player;
    (player.isPaused)
      ? await player.resume()
      : await player.pause();

    res.json({ message: 'Success' });
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/volume', async (req, res) => {
  try {
    await res.locals.player.setVolume(+req.query.v);

    res.json({ message: 'Success' });
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/seek', async (req, res) => {
  try {
    await res.locals.player.seek(+req.query.to);

    res.json({ message: 'Success' });
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/list', async (req, res) => {
  try {
    res.json(res.locals.player.q.items);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/remove', async (req, res) => {
  try {
    const index = +req.query.i;
    res.locals.player.q.items.splice(index, 1);

    res.json(res.locals.player.q.items);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/shuffle', async (req, res) => {
  try {
    res.locals.player.q.shuffle();

    res.json(res.locals.player.q.items);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/skip', async (req, res) => {
  try {
    await res.locals.player.skip();

    res.json(res.locals.player.q.items);
  } catch (error) {
    sendError(res, error);
  }
});

module.exports = router;
