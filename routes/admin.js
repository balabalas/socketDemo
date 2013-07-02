/**
 * administor for send messages to client.
 ***/

// controller
var c = require('./controller');

exports.handler = function(req, res){
  res.render('admin');
};

exports.post = function(req, res){
  // here transform message to clients
  var sockets = c.get();
  sockets.on('connection', function(socket){
    console.log('this is in controller!');
  });
};

