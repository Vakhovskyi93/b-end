const { Router } = require('express');
const express = require('express');
const router = express.Router();
const controllers = require('../controller/admin');
const passport = require('passport');

// router.get('/', controllers.category);
// router.post('/', controllers.category);
// router.delete('/', controllers.category);

router.get('/vacances', controllers.getAll);
router.patch('/vacances', controllers.update);
router.patch('/addtohot', controllers.addtohot);
router.patch('/removehot', controllers.removehot);
router.post('/test', controllers.test);
// router.delete('/', controllers.category);

module.exports = router;
