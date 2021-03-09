var mysql = require('mysql');
const keys = require('../keys/keys');
const Con = require('../Mysql/Mysql');

module.exports.getAll = async (req, res) => {
	console.log(' CATEGORY getAll ');
	try {
		const connection = mysql.createConnection(keys.connect);
		connection.connect();
		await connection.query(`SELECT * FROM Category`, (error, result) => {
			if (error) throw error;
			console.log(result);
			connection.end();
			res.send(result);
		});
	} catch (error) {
		console.log(error);
	}
};
// module.exports.getcategoryByid = (req, res) => {
// 	console.log(' CATEGORY getcategoryByid ');
// 	res.send({ massege: '  CATEGORY getcategoryByid' });
// };
module.exports.remove = async (req, res) => {
	console.log(' CATEGORY remove ', req.body.name);

	try {
		const connection = mysql.createConnection(keys.connect);
		connection.connect();
		await connection.query(`SELECT * FROM Category WHERE categoryName = '${req.body.name}' `, (error, result) => {
			if (error) throw error;
			console.log(result.length);
			if (result.length > 0) {
				connection.query(`DELETE FROM Category WHERE categoryName = '${req.body.name}' `, (error, result) => {
					if (error) throw error;
					connection.end();
					res.send({ massege: 'Категория удалена' });
				});
			} else {
				connection.end();
				res.send({ massege: 'Категория не найдена' });
			}
		});
	} catch (error) {
		console.log(error);
	}
};
module.exports.create = async (req, res) => {  
	console.log(' CATEGORY create ');
 
	try {
		const connection = mysql.createConnection(keys.connect);
		connection.connect();
		await connection.query(`SELECT * FROM Category WHERE categoryName = '${req.body.name}' `, (error, result) => {
			if (error) throw error;
			console.log(result.length);
			if (result.length == 0) {
				connection.query(
					`INSERT Category(categoryName)	VALUES ('${req.body.name}'); `,
					function (error, results, fields) {
						if (error) throw error;
						connection.end();
						res.send({ massege: 'Ура! Категория  добавлена' });
					}
				);
			} else {
				connection.end();
				res.send({ massege: 'Такая Категория уже есть' });
			}
		});
	} catch (error) {
		console.log(error);
	}
};
// module.exports.update = (req, res) => {
// 	console.log(' CATEGORY update ');
// 	res.send({ massege: '  CATEGORY update' });
// };
