const bot = require('../../bot');
const express = require('express');
const { validateGuild } = require('../modules/middleware');

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', validateGuild, (req, res) => res.render('dashboard/show'));

module.exports = router;