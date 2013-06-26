
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var io = require('socket.io');
var path = require('path');

var app = express();
var server = http.createServer(app);

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

routes(app);
// app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var cid = 0; // client id.

io.set('log level', 2);
io.enable('gzip');

io.sockets.on('connection', function(socket){
  var tmpId = cid;  // here can store info. eg. will not be cover by next id.
  socket.emit('id', cid++);
  socket.on('cb', function(data){
    console.log('At callback!');
    socket.emit('push', 'push data!');
  });

  socket.on('myName', function(data){
    console.log('new user login: ' + data);
    socket.broadcast.emit('updateNameList', data);
  });

  socket.on('disconnect', function(){
    console.log('disconnect to client at ' + tmpId);
  });
});


