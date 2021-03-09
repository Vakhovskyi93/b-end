const express = require('express');
//const authRoutes = require('./routs/auth');

const passport = require('passport');
const parser = require('body-parser');
let fileUpload = require('express-fileupload');

const cors = require('cors'); // обработка cors запросов
const morgan = require('morgan'); //npm install passport-jwt
const fs = require('fs');
const authRoutes = require('./routs/auth');
const category = require('./routs/category');
const vacancy = require('./routs/getData');
const users = require('./routs/users');
const conditions = require('./routs/conditions');
const admin = require('./routs/admin');
//var fileUpload = require('express-fileupload');

// const mysql = require('mysql');
// const keys = require('./keys/keys');
// const connection = mysql.createConnection(keys.connect);
// connection.connect();

const app = express();
app.use(passport.initialize());
require('./middleware/passport')(passport);

//var multer = require('multer');
//var upload = multer({ dest: './uploads/' });

app.use(express.static(__dirname));
app.use(fileUpload({}));
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for parsing multipart/form-data

app.use('/api/auth', authRoutes);
app.use('/category', category);
app.use('/vacancy', vacancy);
app.use('/users', users);
app.use('/api/admin', category);
app.use('/api/administration', admin);
app.use('/api/admin/conditions', conditions);

const port = process.env.PORT || 5000;

app.listen(5000, () => {
	console.log(`Has beeen started on ${port}`);
});
