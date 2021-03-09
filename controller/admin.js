var mysql = require('mysql');
const keys = require('../keys/keys');
const Con = require('../Mysql/Mysql');
const fs = require('fs');
// var multer = require('multer');
// var upload = multer();
module.exports.getAll = (req, res) => {
	console.log('>>>>>> getAll');
	try {
		const connection = mysql.createConnection(keys.connect);
		connection.connect();
		connection.query('SELECT * FROM Vacances where moderat = 0', function (error, results, fields) {
			if (error) throw error;

			connection.end();
			res.send(results);
		});
	} catch (error) {
		console.log(error);
	}
};

// принимает "id"
module.exports.update = (req, res) => {
	console.log('>>>>>> getById', req.body);
	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();

		connection.query(
			`UPDATE Vacances SET moderat = '1' where vacancy_id = ${req.body.id} `,
			function (error, results, fields) {
				if (error) {
					connection.end();
					res.status(400).json({ message: error.code });
					throw error;
				}
				console.log(results);
				console.log('updated');
				connection.end();
				res.status(200).json({ message: `${req.body.id}  updated` });
			}
		);
	} catch (error) {
		console.log(error);
		res.status(204).json({ message: `${req.body.id}  NONupdated` });
	}
};
// принимает "id"
module.exports.addtohot = (req, res) => {
	console.log('>>>>>> getById', req.body);
	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();

		connection.query(
			`UPDATE Vacances SET Hot = '1' where vacancy_id = ${req.body.id} limit = 3 `,
			function (error, results, fields) {
				if (error) {
					connection.end();
					res.status(400).json({ message: error.code });
					throw error;
				}
				console.log(results);
				console.log('updated');
				connection.end();
				res.status(200).json({ message: `${req.body.id}  added to Hot` });
			}
		);
	} catch (error) {
		console.log(error);
		res.status(204).json({ message: `${req.body.id}  NONupdated` });
	}
};
// принимает "id"
module.exports.removehot = (req, res) => {
	console.log('>>>>>> getById', req.body);
	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();

		connection.query(
			`UPDATE Vacances SET Hot = '0' where vacancy_id = ${req.body.id} `,
			function (error, results, fields) {
				if (error) {
					connection.end();
					res.status(400).json({ message: error.code });
					throw error;
				}
				console.log(results);
				console.log('updated');
				connection.end();
				res.status(200).json({ message: `${req.body.id}  remove` });
			}
		);
	} catch (error) {
		console.log(error);
		res.status(204).json({ message: `${req.body.id}  NONupdated` });
	}
};

module.exports.test = (req, res) => {
	console.log('>>>>>> ТЕСТ', req.body);
	try {
		const connection = mysql.createConnection(keys.connect);

		connection.connect();

		connection.query(
			`SELECT  vacancy_id from UsersFavoritList where user_id = '${req.body.id}' `,
			function (error, results, fields) {
				if (error) {
					connection.end();
					//res.status(400).json({ message: error.code });
					res.send('321');
					throw error;
				}
				let result = [];
				let r = JSON.parse(JSON.stringify(results));
				r.map((i) => result.push(i.vacancy_id));
				
				connection.end();
				res.status(200).json(result);
			}
		);
	} catch (error) {
		console.log(error);
		res.status(204).json({ message: `${req.body.id}  NONupdated` });
	}
};
