const { Router } = require('express');
const express = require('express');
const router = express.Router();
const controllers = require('../controller/vacancy');
const passport = require('passport');
// http://localhost:5000//vacancy/
router.get('/', controllers.getAll);
router.get('/test', controllers.test);
router.post('/get', controllers.getById);
 
router.get('/category', controllers.getBycategory);
router.get('/city', controllers.getBycity);
router.post('/favorite', passport.authenticate('jwt', { session: false }), controllers.addToFavorite);
router.delete('/favorite', passport.authenticate('jwt', { session: false }), controllers.removeFromFavorite);
router.post('/', passport.authenticate('jwt', { session: false }), controllers.create);
router.delete('/', passport.authenticate('jwt', { session: false }), controllers.remove);
router.patch('/', passport.authenticate('jwt', { session: false }), controllers.update);

router.get('/hotvacancy', controllers.hotvacancy);
router.post('/hotvacancy',passport.authenticate('jwt', { session: false }), controllers.createhotvacancy);
router.delete('/hotvacancy',passport.authenticate('jwt', { session: false }), controllers.deletehotvacancy);

module.exports = router;
