_Config = require('./config.json');
_Traffic = 0;

const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const parser = require('body-parser');
const methodoverride = require('method-override');
const favicon = require('serve-favicon');
const static = require('serve-static');
const errorhandler = require('errorhandler');
const http = require('http');
const https = require('https');
const path = require('path');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const database = require('./database/db');
const routes = require('./routes/routing');
const sockets = require('./socket');


var app = express();
// all environments
process.stdout.write('pending...');
app.set('port', process.env.PORT || _Config.port);
app.set('safeport', process.env.PORT || _Config.safeport);
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(methodoverride());
app.use ((req, res, next) => {
	if (req.secure) return next();
	else return res.redirect('https://' + req.headers.host + req.url);
});

//statics
app.use(favicon(path.join(__dirname, '..', _Config.public, 'images', 'favicon.ico')));
app.use(static(path.join(__dirname, '..', _Config.public)));
app.use(static(path.join(__dirname, '..', 'views')));
routes(app);

if ('development' == app.get('env')) {
	app.use(errorhandler());
}

const options = {useNewUrlParser: true, useFindAndModify: false};
mongoose.connect('mongodb://localhost:'+_Config.mongodb, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	process.stdout.write("\r\x1b[K");
	const options = {
		key  : fs.readFileSync(_Config.sslkey),
		cert : fs.readFileSync(_Config.sslcert)
	};
	var httpServer = http.createServer(app);
	var httpsServer = https.createServer(options, app);
	httpServer.listen(app.get('port'), () => {
		console.log('Server listening on port '+app.get('port'));
	});
	httpsServer.listen(app.get('safeport'), () => {
		console.log('Server listening on safe port '+app.get('safeport'));
	});
	var	io = socketio(httpsServer);
	sockets(io);
});
