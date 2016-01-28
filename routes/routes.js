module.exports = function (app) {

	app.use('/shamer', require('./shamerRouter.js'));
	app.use('/shameBoard', require('./shameBoardRouter.js'));
	app.use('/', require('./homeRouter.js'));

};