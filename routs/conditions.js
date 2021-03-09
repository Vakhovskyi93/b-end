const { Router } = require('express');
const express = require('express');
const router = express.Router();
const controller = require('../controller/conditions');
const passport = require('passport');
// http://localhost:5000/category/getall
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/list', passport.authenticate('jwt', { session: false }), controller.getList);
// http://localhost:5000/category/id
//router.get('/:id', controller.getcategoryByid);
// http://localhost:5000/category/remove
//router.delete('/', passport.authenticate('jwt', { session: false }), controller.remove);
// http://localhost:5000/category/create
//router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
// http://localhost:5000/category/update
//router.patch('/:id', controller.update);

module.exports = router;
