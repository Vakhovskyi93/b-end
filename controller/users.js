module.exports.getAll = (req, res) => {
	console.log('>>>>>> getAll');
	res.send({ massege: 'users getAll' });
};
module.exports.getbyid = (req, res) => {
	console.log('>>>>>> getbyid');
	res.send({ massege: 'users getbyid' });
};
