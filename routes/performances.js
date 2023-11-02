const express = require('express');
const router = express.Router();
const performancesCtrl = require('../controllers/performances')
const isLoggedIn = require('../config/auth');

router.get('/', performancesCtrl.index);

router.get('/new', isLoggedIn, performancesCtrl.new);
router.post('/', performancesCtrl.create);
router.get('/:id', performancesCtrl.show);

router.get('/:id/edit', isLoggedIn, performancesCtrl.edit);
router.put('/:id', performancesCtrl.update);
router.delete('/:id', performancesCtrl.deletePerformance);

module.exports = router