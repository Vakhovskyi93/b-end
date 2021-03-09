const { Router } = require('express');
const express = require('express');
const router = express.Router();
const controllers = require('../controller/auth');
const passport = require('passport');

router.post('/login', controllers.login);

router.post('/register', controllers.register);
router.get('/checktoken', passport.authenticate('jwt', { session: false }), controllers.checktoken);

module.exports = router;
