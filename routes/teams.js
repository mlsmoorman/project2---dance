const express = require('express');
const router = express.Router();
const teamsCtrl = require('../controllers/teams')

router.get('/', teamsCtrl.index);
router.get('/new', teamsCtrl.new);
router.post('/', teamsCtrl.create);
router.get('/:id', teamsCtrl.show);

module.exports = router;