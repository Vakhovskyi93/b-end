const { Router } = require('express');
const express = require('express');
const router = express.Router();
const controllers = require('../controller/users');
const passport = require('passport')

router.get('/',  passport.authenticate('jwt', { session: false }), controllers.getAll);
router.get('/id',  passport.authenticate('jwt', { session: false }), controllers.getbyid);

module.exports = router; 
