const JWTStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const mysql = require('mysql');

const keys = require('../keys/keys');
let opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'emegrand',
};

module.exports = (passport) => {
	passport.use(
		new JWTStrategy(opts, async function (payload, done) {
			const connection = await mysql.createConnection(keys.connect);
			connection.connect();
			connection.query(
				`SELECT * FROM Users WHERE email = '${payload.email}' `,
				function (error, results, fields) {
					if (error) throw error;
					connection.destroy();
					
					if (results) {
						done(null, results);
					} else {
						done(null, false);
					}
				}
			);
		})
	);
};
