var mysql = require('mysql');
const keys = require('../keys/keys');
const fs = require('fs');

module.exports.con = class MysqlConnect {
	constructor(data) {
		this.result = '';
		this.data = data;
		this.connection = mysql.createConnection(keys.connect);
		this.connection.connect();
	}

	postVacancy(file) {
		console.log('!!!!!!!!!!!!!!!', this.data, file);
		let conditions = JSON.stringify({ 
			noExperience: `${this.data.noExperience || false}`,
			host: `${this.data.host || false}`,
			longTerm: `${this.data.longTerm || false}`,
			noLanguage: `${this.data.noLanguage || false}`,
			vacationMoney: `${this.data.vacationMoney || false}`,
			dinner: `${this.data.dinner || false}`,
			cityCenter: `${this.data.cityCenter || false}`,
			freeSchedule: `${this.data.freeSchedule || false}`,
			comfortPlace: `${this.data.comfortPlace || false}`,
			ensurence: `${this.data.ensurence || false}`,
			gim: `${this.data.gim || false}`,
			vip: `${this.data.vip || false}`,
		});
		//	fs.mkdirSync(`uploads/${this.data.companyName}${this.data.hrPhone}`);
		console.log('created');
		console.log('fole', file.image.data);

		// Дописать сохранение файла и ссылку добавить в бд запрос
		//file = JSON.parse(JSON.stringify(file));
		//console.log(file.image.data);
		//file.map((i) => console.log(i.data));
		// fs.writeFile(
		// 	`uploads/${this.data.companyName}${this.data.hrPhone}/${this.data.companyName}${this.data.hrPhone}`,
		// 	file.image,
		// 	(err) => {
		// 		if (err) throw err;
		// 		console.log('afqk cj[hfyty');
		// 	}
		// );
		let id = Date.now();
		console.log(conditions);
		console.log('conditions', JSON.stringify(conditions));
		let companyLogo = '';
		try {
				this.connection.query(
				`INSERT Vacances (vacancy_id, title, body,salary, company, city, remoteness , createData , category, conditions , additional_conditions, companyLogo, address , metro , mapLocation , hrName ,  hrPhone  , hrTelegram , hrMail , workingTime , additionalInfo )
		    	VALUES ('${id}', '${this.data.title}', '${this.data.body}' , '${this.data.salary}', '${this.data.company}','${this.data.city}','${this.data.remoteness}', '${this.data.createData}',' ${this.data.category}', '${conditions}'
		    	, '${this.data.additional_conditions}', "companyLogo", '${this.data.address}','${this.data.metro}','${this.data.mapLocation}',  ' ${this.data.hrName}','${this.data.hrPhone}', '${this.data.hrTelegram}','${this.data.hrMail}','${this.data.workingTime}','${this.data.additionalInfo}'
		    		 ); `,
				function (error, results, fields) {
					if (error) throw error;

					this.connection.end();
					console.log('Ура! Вакансия добавлена');
				}
			);
		} catch (error) {
			console.log(error);
		}

		this.connection.end();
		return { result: 'Ура! Вакансия добавлена' }; 
	}

	async createCategory() {
		console.log('>>>>', this.data.name);
		let result;
		try {
			await this.connection.query(
				`SELECT * FROM Category WHERE categoryName = '${this.data.name}' `,
				(error, result) => {
					if (error) throw error;
					console.log(result.length);
					if (result.length == 0) {
						this.connection.query(
							`INSERT Category(categoryName)	VALUES ('${this.data.name}'); `,
							function (error, results, fields) {
								if (error) throw error;
								console.log('Ура! Категория  добавлена');
								this.result = 'Ура! Категория  добавлена';
							}
						);
					} else {
						console.log('Такая Категория уже есть');
						this.result = 'Такая Категория уже есть';
					}
				}
			);
			// this.connection.query(
			// 	`INSERT Category(categoryName)	VALUES ('${this.data.name}'); `,
			// 	function (error, results, fields) {
			// 		if (error) throw error;

			// 		console.log('Ура! Категория  добавлена');

			// 	}
			// );
		} catch (error) {
			console.log(error);
		}
		this.connection.end();
		return result;
	}
	destroy() {
		return this.result;
	}
};

// CREATE TABLE FavoriteVacances (
//   ID   INT              NOT NULL,
//   owner VARCHAR (20)     NOT NULL,
//   vacanceNumber varchar(30)

//   PRIMARY KEY (ID)
// );

//  CREATE TABLE History (ID int NOT NULL AUTO_INCREMENT, owner varchar(30),	vacanceNumber varchar(30),	PRIMARY KEY (ID) );
//  CREATE TABLE HotVacances (ID int NOT NULL AUTO_INCREMENT, 	vacanceNumber varchar(30),	PRIMARY KEY (ID) );
//  CREATE TABLE TopVacances (ID int NOT NULL AUTO_INCREMENT, 	vacanceNumber varchar(30),  priority int,	PRIMARY KEY (ID) );
//  CREATE TABLE Category (ID int NOT NULL AUTO_INCREMENT, 	categoryName varchar(30),  	PRIMARY KEY (ID) );

//  INSERT Category(categoryName  )	VALUES ("Начало карьеры");
// CREATE TABLE Conditions (ID int NOT NULL AUTO_INCREMENT, vacance_id varchar(30),	Experience varchar(30), Language varchar(30), Gim Boolean, Ensurence Boolean, Vip Boolean, Term varchar(30) ,	PRIMARY KEY (ID) );
//CREATE TABLE  ConditionsList (ID int NOT NULL AUTO_INCREMENT, ConditionName varchar(30),		PRIMARY KEY (ID) );

//  INSERT ConditionsList( ConditionName )	VALUES ("Второй");