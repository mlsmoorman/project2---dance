const express = require('express');
const router = express.Router();
const scoresCtrl = require('../controllers/scores');

router.post('/performances/:id/scores', scoresCtrl.create);
router.delete('/scores/:id', scoresCtrl.deleteScore);

module.exports = router;