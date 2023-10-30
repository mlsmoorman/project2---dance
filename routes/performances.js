const express = require('express');
const router = express.Router();
const performancesCtrl = require('../controllers/performances')

router.get('/', performancesCtrl.index);
router.get('/new', performancesCtrl.new);
router.post('/', performancesCtrl.create);
router.get('/:id', performancesCtrl.show);

module.exports = router;