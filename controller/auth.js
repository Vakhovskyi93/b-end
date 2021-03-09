const fs = require('fs');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const pasWord = 'emegrand';
const parser = require('body-parser');
const mysql = require('mysql');
const keys = require('../keys/keys');
const { vacancy } = require('.');

module.exports.login = (req, res) => {
	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();

		connection.query(`SELECT * FROM Users WHERE email = '${req.body.email}' `, function (error, results, fields) {
			if (error) throw error;
			connection.destroy();
			result = JSON.parse(JSON.stringify(results));
			if (result.length == 0) {
				return res.status(201).json({
					message: 'Пользователь не найден ):',
				});
			}
			if (result) {
				const salt = bcrypt.genSaltSync(10);
				//let hash = bcrypt.hashSync(req.body.password, salt);
				const passVerification = bcrypt.compareSync(req.body.password, result[0].hash);

				if (passVerification) {
					//token
					let token = jwt.sign(
						{
							userId: result.user_id,
							email: req.body.email,
						},
						pasWord,
						{ expiresIn: 3600 }
					);
					return res.send({
						user: {
							user_id: result[0].user_id,
							name: result[0].name,
							phone: result[0].phone,
							email: result[0].email,
							cv: result[0].cv,
							foto: result[0].foto,
							favoriteJobs: result[0].favoriteJobs,
							feedbackHistory: result[0].feedbackHistory,
							role: result[0].role,
						},
						token: `Bearer ${token}`,
					});
				} else {
					// res.status(204)
					return res.send(JSON.stringify({ message: 'Неправильный пароль' }));
				}
			}
			connection.destroy();
			res.send(results);
		});
	} catch (error) {
		console.log(error);
	}
};
module.exports.register = (req, res) => {
	// search user
	console.log('start >>>>', keys);
	try {
		const connection = mysql.createConnection(keys.connect);
		connection.connect();

		connection.query(`SELECT * FROM Users WHERE email = '${req.body.email}'`, function (error, results, fields) {
			if (error) throw error;
			connection.destroy();
			if (results.length !== 0) {
				res.status(406);
				res.send({ message: 'Эта почта уже используется' });
			} else {
				let salt = bcrypt.genSaltSync(10);
				let hash = bcrypt.hashSync(req.body.password, salt); // hash for db
				let id;
				function genID() {
					return (id = Date.now() + '' + Math.floor(Math.random() * 100000));
				}
				genID();
				let token = jwt.sign(
					{
						userId: id,
						email: req.body.email,
					},
					pasWord,
					{ expiresIn: 3600 }
				);
				try {
					const connection = mysql.createConnection(keys.connect);
					connection.connect();
					connection.query(
						`INSERT Users ( name, email, user_id, phone, hash, role) VALUES ('${req.body.name}', '${req.body.email}', '${id}' , '${req.body.phone}', '${hash}', false); `,
						function (error, results, fields) {
							if (error) throw error;

							connection.destroy();
							res.status(201).json({
								user: {
									user_id: req.body.id,
									name: req.body.name,
									phone: req.body.phone,
									email: req.body.email,
									cv: '',
									foto: '',
									favoriteJobs: [],
									feedbackHistory: [],
								},
								token: `Bearer ${token}`,
								message: 'Пользователь успешно зарегистрировался',
							});
						}
					);
				} catch (error) {
					console.log(error);
				}

				connection.destroy();
			}
		});
	} catch (error) {
		console.log(error);
	}
};
module.exports.checktoken = (req, res) => {
	res.send(true);
};

// INSERT INTO Vacances ( vacancy_id, title, body,salary, company, city, remoteness, createData, category, conditions, additional_conditions, companyLogo, 	address, metro, mapLocation, hrName, hrPhone ,hrTelegram, hrMail, workingTime, additionalInfo ) VALUES ('65555895534', 'Супервайзер колл-центра', 'здійснює реалізацію державної політики з питань організації договірної роботи здійснює реалізацію державної політики з питань організації договірної роботи здійснює реалізацію державної політики з питань організації договірної роботи здійснює реалізацію державної політики з питань організації договірної роботи здійснює реалізацію державної політики з питань організації договірної роботи' , '670 - 830', 'FISHKI','Одесса', 4, '1613830172743', 	'Ремонт', '{sasdasdasdas}', 'sdfsdfsdfsdfwerwerwerxcxcvxcvxcvxcfbhgfh', 'nologo', 'ADRESS','Metro','asdasdasdqweqweqwdsf', 'ira', '+38096 88 55 888', 'telegram', 'qq@qq.qq','full time','asdasdwqweq'	 );

// CREATE TABLE UsersFavoritList (ID int NOT NULL AUTO_INCREMENT,user_id varchar(30),	vacancy_id varchar(30),	PRIMARY KEY (ID) );
// INSERT INTO UsersFavoritList ( user_id, vacancy_id ) VALUE ( '161382481901046323', 'asdasdasdqweqweqwdsf');

// 	 rimaid 161382481901046323
//ALTER TABLE Vacances ADD Hot BOOLEAN;
//ALTER TABLE Vacances ADD exp varchar(30);
