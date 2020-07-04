const express = require('express');

const router = express.Router();

const modules = [
  { name: 'autoMod', icon: 'fa-gavel' },
  { name: 'economy', icon: 'fa-coins' },
  { name: 'general', icon: 'fa-star' },
  { name: 'music', icon: 'fa-music' }
];
const commands = [
  { name: 'general ping', moduleName: 'general' },
  { name: 'general ping', moduleName: 'general' },
  { name: 'economy ping', moduleName: 'economy' },
  { name: 'economy ping', moduleName: 'economy' },
  { name: 'economy ping', moduleName: 'economy' },
  { name: 'auto-mod ping', moduleName: 'autoMod' },
  { name: 'music ping', moduleName: 'music' },
  { name: 'music ping', moduleName: 'music' },
];

router.get('/', (req, res) => res.render('home'));
router.get('/commands', (req, res) => res.render('commands', { commands, modules }));

module.exports = router;