const mysql = require('mysql');
const keysMYSQL = require('./keys');

class MysqlReq {
	constructor(user) {
		this.user = user;
		this.connection = mysql.createConnection(keysMYSQL.connect).promise();
	}
	async connect() {
		await this.connection.connect(function (err) {
			if (err) {
				return console.error('Ошибка: ' + err.message);
			} else {
				console.log('Подключение к серверу MySQL успешно установлено');
			}
		});
	}

	async add() {
		console.log(this.user, '+++++');
		const user = [this.user.name, this.user.login, this.user.password];
		const sql = 'INSERT INTO users(  name, email, password) VALUES(?, ?, ?)';
		return await this.connection
			.query(sql, user)
			.then(() => {
				return 'Пользователь успешно зарегистрирован';
			})
			.catch((err) => {
				console.log(err.message);
				return err.message;
			});
	}

	async checkUserinBase() {
		const sql = `SELECT * FROM users WHERE  email =?`;
		return await this.connection
			.query(sql, this.user.login)

			.then((res) => {
				return res[0];
			})
			.catch((err) => {
				console.log(err.message);
				return err.message;
			});
	}

	async checkPassword() {
		const user = [this.user.login, this.user.password];
		const sql = `SELECT email , password FROM users WHERE email=? `;
		return await this.connection
			.query(sql, user)
			.then((res) => {
				return res[0];
			})
			.catch((err) => {
				console.log(err.message);
				return err.message;
			});
	}

	async select() {
		const sql = `SELECT * FROM users`;

		return await this.connection.query(sql).then((res) => {
			return res[0];
		});
	}

	async userPassportAuth(userId) {
		console.log(userId);
		console.log('sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf');
		const sql = `SELECT email , id  FROM users where id=?`;

		return await this.connection.query(sql, userId).then((res) => {
			return res[0];
		});
	}

	end() {
		this.connection.end(function (err) {
			if (err) {
				return console.log('Ошибка: ' + err.message);
			}
			console.log('Подключение закрыто');
		});
	}
}

module.exports = MysqlReq;
