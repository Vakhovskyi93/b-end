var mysql = require('mysql');
const keys = require('../keys/keys');
const Con = require('../Mysql/Mysql');
const admin = require('../controller/admin');
const fs = require('fs');
// var multer = require('multer');
// var upload = multer();
module.exports.getAll = (req, res) => {
	try {
		const connection = mysql.createConnection(keys.connect);
		connection.connect();
		connection.query('SELECT * FROM Vacances where moderat = 1', function (error, results, fields) {
			if (error) throw error;

			connection.end();
			res.send(results);
		});
	} catch (error) {
		console.log(error);
	}
};
module.exports.getById = (req, res) => {
	console.log('>>>>>> getById', req.body);
	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();

		connection.query(
			`SELECT * FROM Vacances WHERE vacancy_id = '${req.body.id}' `,
			function (error, results, fields) {
				if (error) throw error;
				console.log(results);
				connection.end();
				res.send(results);
			}
		);
	} catch (error) {
		console.log(error);
	}
};

module.exports.getBycategory = (req, res) => {
	console.log('>>>>>> getBycategory');
	res.send({ massege: 'vacancy getBycategory' });
};
module.exports.getBycity = (req, res) => {
	console.log('>>>>>> getBycity');
	res.send({ massege: 'vacancy getBycity' });
};

module.exports.addToFavorite = (req, res) => {
	console.log('>>>>>> addToFavorit', req.body);

	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();
		connection.query(
			`INSERT INTO UsersFavoritList ( user_id, vacancy_id ) VALUE ( '${req.body.id}', '${req.body.vacancy_id}')`,
			function (error, results, fields) {
				if (error) throw error;

				connection.end();
				admin.test(req, res);
				console.log(` Вакансия  '${req.body.vacancy_id}' добавлена в избранное`);
				///res.status(200).json({ massege: 'vacancy addToFavorit' });
			}
		);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};
module.exports.removeFromFavorite = (req, res) => {
	console.log('>>>>>> removeFromFavorite');

	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();
		connection.query(
			`DELETE FROM  UsersFavoritList WHERE vacancy_id = '${req.body.vacancy_id}' AND user_id = '${req.body.id}' `,
			function (error, results, fields) {
				if (error) throw error;

				connection.end();
				console.log(` Вакансия  '${req.body.vacancy_id}' удалена из избранного`);
				admin.test(req, res);
				//res.status(200).json({ massege: 'vacancy removeFromFavorite' });
			}
		);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

module.exports.create = (req, res, next) => {
	console.log(req.files);
	let id = Date.now();
	// let conditions = JSON.stringify({
	// 	noExperience: `${req.body.noExperience || false}`,
	// 	host: `${req.body.host || false}`,
	// 	longTerm: `${req.body.longTerm || false}`,
	// 	noLanguage: `${req.body.noLanguage || false}`,
	// 	vacationMoney: `${req.body.vacationMoney || false}`,
	// 	dinner: `${req.body.dinner || false}`,
	// 	cityCenter: `${req.body.cityCenter || false}`,
	// 	freeSchedule: `${req.body.freeSchedule || false}`,
	// 	comfortPlace: `${req.body.comfortPlace || false}`,
	// 	ensurence: `${req.body.ensurence || false}`,
	// 	gim: `${req.body.gim || false}`,
	// 	vip: `${req.body.vip || false}`,
	// });
	// console.log(conditions);

	function save() {
		console.log('str');
		console.log('asdasdadasdasd');
		console.log(req.files['image'].name);
		console.log(req.files['image'].data);

		fs.mkdirSync(`./uploads/${req.body.companyName}${id}`);
		fs.writeFile(
			`./uploads/${req.body.companyName}${id}/${req.files['image'].name}`,
			req.files['image'].data,
			(err) => {}
		);
	}

	if (req.files) {
		save();
	}

	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();
		connection.query(
			`
			INSERT Vacances (vacancy_id, title, body, salary, company, city, 
			remoteness, createData, category,   companyLogo, address,
			 metro, mapLocation, hrName, hrPhone, hrTelegram, hrMail, workingTime, exp, additionalInfo, Top, Hot, moderat )
			 VALUES ('${id}', '${req.body.title}', '${req.body.body}', '${req.body.salary}', '${req.body.companyName}', '${
				req.body.city
			}', '${req.body.remoteness || 0}', '${id}','${req.body.category}',  'companyLogo', '${
				req.body.address
			}', '${req.body.metro}', '${req.body.mapLocation}', '${req.body.hrName}','${req.body.hrPhone}', '${
				req.body.hrTelegram
			}','${req.body.hrMail}','${req.body.workingTime}','${req.body.publicTime}','${
				req.body.additionalInfo
			}', 0,0,0)`,
			function (error, results, fields) {
				if (error) throw error;

				connection.query(
					`INSERT Conditions (vacance_id, Language, Experience, Первый, Второй) VALUES ('${id}','${req.body.Language}','${req.body.Experience}','${req.body['Первый']}', '${req.body['Второй']}')`,
					function (error, results, fields) {
						if (error) throw error;
						console.log('sucssesful');
						console.log(results);
					}
				);

				console.log('results!!!!', results);
				connection.end();
				console.log('Ура! Вакансия добавлена');
			}
		);
	} catch (error) {
		console.log(error);
	}

	if (!req.files) res.status(400).json('Ошибка при загрузке файла');
	else res.status(200).json({ massege: `Вакансия '${req.body.title}' отправленна на медерацию` });
};
module.exports.remove = (req, res) => {
	console.log('>>>>>> remove');
	console.log(req.body, req.body.id);

	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();

		connection.query(`DELETE FROM Vacances	WHERE vacancy_id = '${req.body.id}' `, function (error, results, fields) {
			console.log('here');
			if (error) throw error;

			// Удалить все связаные с вакансией данные !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			connection.end();

			res.send({ result: `  Вакансия ${req.body.id} удалена` });
		});
	} catch (error) {
		console.log(error);
	}
};
module.exports.update = (req, res) => {
	console.log('>>>>>> update');
	console.log(req.body);
	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();
		connection.query(
			`UPDATE vacances SET
			title = '${req.body.title}',
			body = '${req.body.body}',
			salary = '${req.body.salary}',
			company = '${req.body.company}',
			city = '${req.body.city}',
			remoteness = '${req.body.remoteness}',
			createData = '${req.body.createData}',
			category = '${req.body.category}',
			conditions = '${req.body.conditions}',
			additional_conditions = '${req.body.additional_conditions}',
			companyLogo = '${req.body.companyLogo}',
			address = '${req.body.address}',
			metro = '${req.body.metro}', 
			mapLocation = '${req.body.mapLocation}',
			hrName = '${req.body.hrName}',
			hrPhone  = '${req.body.hrPhone}',
			hrTelegram = '${req.body.hrTelegram}',
			hrMail = '${req.body.hrMail}',
			workingTime = '${req.body.workingTime}',
			additionalInfo = '${req.body.additionalInfo}'
			 
			 WHERE vacancy_id = ${req.body.id} `,
			function (error, results, fields) {
				console.log('here');
				if (error) throw error;

				// Удалить все связаные с вакансией данные !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				connection.end();

				res.send({ result: `  Вакансия ${req.body.id} обновлена` });
			}
		);
	} catch (error) {
		console.log(error);
	}
};
module.exports.test = (req, res) => {
	console.log('>>>>>> test');
	console.log(req.body);
	try {
		const connection = mysql.createConnection(keys.connect);
		connection.connect();
		connection.query(
			`SELECT *  ,
			CASE
				WHEN ID THEN "результат_1"
				 
			END 
			FROM UsersFavoritList 
	   `,
			function (error, results, fields) {
				if (error) throw error;

				connection.end();
				res.send(results);
			}
		);
	} catch (error) {
		console.log(error);
	}
};

module.exports.hotvacancy = (req, res) => {
	console.log('>>>>>> hotvacancy');
	try {
		const connection = mysql.createConnection(keys.connect);
		connection.connect();
		connection.query(`select * from Vacances where hot = '1'  `, function (error, results, fields) {
			if (error) throw error;
			console.log(results);
			connection.end();
			res.send(results);
		});
	} catch (error) {
		console.log(error);
	}
};
module.exports.createhotvacancy = (req, res) => {
	console.log('>>>>>> createhotvacancy');
	try {
		const connection = mysql.createConnection(keys.connect);
		connection.connect();
		connection.query(
			`INSERT HotVacances (vacanceNumber ) VALUES ('${req.body.id}')`,
			function (error, results, fields) {
				if (error) throw error;
				connection.end();
				console.log('sucssesful');
				console.log(results);
				res.status(200).json({ massege: `Вакансия '${req.body.id}'  добавленна в горящие` });
			}
		);
	} catch (error) {
		console.log(error);
		connection.end();
		res.status(204).json({ massege: 'error' });
	}
};

module.exports.deletehotvacancy = (req, res) => {
	console.log('>>>>>> deletehotvacancy');

	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();

		connection.query(
			`DELETE FROM HotVacances	WHERE vacanceNumber = '${req.body.id}' `,
			function (error, results, fields) {
				console.log('deletehotvacancy');
				if (error) throw error;

				connection.end();
				res.status(200).json({ massege: `Вакансия '${req.body.id}'  удалена из горящих` });
			}
		);
	} catch (error) {
		console.log(error);
		connection.end();
		res.status(200).json(error);
	}
};
