module.exports = (app) => {
	app.get('/dashboard/*', (req, res) => res.render('dashboard/index'));
	app.get('*', (req, res) => res.render('template/example/index'));
};
