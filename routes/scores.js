const express = require('express');
const router = express.Router();
const scoresCtrl = require('../controllers/scores');

router.post('/performances/:id/scores', scoresCtrl.create);

module.exports = router;