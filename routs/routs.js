// const express = require('express');
// const app = express();
// const fs = require('fs');
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// const pasWord = 'emegrand';
// module.exports.login = function login(req, res) {
// 	const salt = bcrypt.genSaltSync(10);
// 	console.log('inside login ');

// 	let hash = bcrypt.hashSync(req.body.password, salt);
// 	let user = fs.readFile('./testbdForDelete/userbd.json', (err, data1) => {
// 		let data = JSON.parse(data1);
// 		let result = data.find((i) => i.email == req.body.email);

// 		if (!result) {
// 			return res.send(JSON.stringify({ err: 'пользователь не найден' }));
// 		}
// 		if (result) {
// 			const passVerification = bcrypt.compareSync(req.body.password, result.password);
// 			console.log('passVerification', passVerification);

// 			if (passVerification) {
// 				//token
// 				let token = jwt.sign(
// 					{
// 						userId: result.user_id,
// 						email: req.body.email,
// 					},
// 					pasWord,
// 					{ expiresIn: 10 }
// 				);
// 				console.log('gpass true');
// 				return res.send({
// 					user: {
// 						user_id: result.user_id,
// 						name: result.name,
// 						phone: result.phone,
// 						email: result.email,
// 						cv: result.cv,
// 						foto: result.foto,
// 						favoriteJobs: result.favoriteJobs,
// 						feedbackHistory: result.feedbackHistory,
// 					},
// 					token: `Bearer ${token}`,
// 				});
// 			} else {
// 				// res.status(204)
// 				return res.send(JSON.stringify({ err: 'Неправильный пароль' }));
// 			}
// 		}
// 	});
// };

// module.exports.register = function register(req, res) {
// 	console.log('routs.js register');
// 	//console.log(req.body);
// 	let salt = bcrypt.genSaltSync(10);
// 	let hash = bcrypt.hashSync(req.body.password, salt); // hash for db

// 	let file = fs.readFileSync('./testbdForDelete/userbd.json');

// 	let data = JSON.parse(file);
// 	let id = data.length;
// 	let candidate = data.find((i) => i.email == req.body.email);
// 	if (candidate) {
// 		res.status(406);
// 		res.send({
// 			message: 'Такой email уже зарегистрирован',
// 		});
// 	} else {
// 		let user = {
// 			user_id: id,
// 			name: req.body.name,
// 			phone: req.body.phone,
// 			email: req.body.email,
// 			password: hash,
// 			cv: '',
// 			foto: '',
// 			favoriteJobs: [],
// 			feedbackHistory: [],
// 		};
// 		let token = jwt.sign(
// 			{
// 				userId: id,
// 				email: req.body.email,
// 			},
// 			pasWord,
// 			{ expiresIn: 10 }
// 		);

// 		data.push(user);

// 		try {
// 			fs.writeFileSync('./testbdForDelete/userbd.json', JSON.stringify(data));
// 		} catch (e) {
// 			console.log(e);
// 			res.send({
// 				message: 'Ошибка регистрации',
// 			});
// 		}

// 		res.status(201).json({
// 			user: {
// 				user_id: id,
// 				name: req.body.name,
// 				phone: req.body.phone,
// 				email: req.body.email,
// 				cv: '',
// 				foto: '',
// 				favoriteJobs: [],
// 				feedbackHistory: [],
// 			},
// 			token: `Bearer ${token}`,
// 		});
// 	}
// };

// module.exports.deliteFromFavorit = function deliteFromFavorit(req, res) {
// 	console.log('routs.js deliteFromFavorit');
// 	console.log(req.body);
// 	let id = req.body.id;
// 	let itemid = req.body.itemid;
// 	let result;
// 	fs.readFile('./testbdForDelete/userbd.json', (err, data) => {
// 		result = JSON.parse(data);

// 		result.find((i, index) => {
// 			if (i.id == id) {
// 				result.favorite.find((i, index) => {
// 					if (i.id == itemid) {
// 						result.splice(index, 1);
// 					}
// 				});
// 			}
// 		});

// 		res.send(JSON.stringify({ massege: 'Удалено' }));
// 	});
// };
// module.exports.getall = function getAll(req, res) {
// 	fs.readFile('./testbdForDelete/bd.json', (err, data) => {
// 		result = JSON.parse(data);

// 		res.send(JSON.stringify(result));
// 	});
// };
