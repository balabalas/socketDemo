
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
//var controller = require('./routes/controller');
var io = require('socket.io');
var path = require('path');

var app = express();
var server = http.createServer(app);
var IOEngine = require('./lib/socket');

// io
io = io.listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// route app
routes(app);

// app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var cid = 0; // client id.

io.set('log level', 2);
io.enable('gzip');

IOEngine(io);


