module.exports = function (app) {

	app.use('/ManuelAlert', require('./shamerRouter.js'));
	app.use('/BuildAlert', require('./shameBoardRouter.js'));
	app.use('/', require('./homeRouter.js'));

};