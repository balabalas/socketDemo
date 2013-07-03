/**
 * administor for send messages to client.
 ***/

// controller
var c = require('./controller');

exports.handler = function(req, res){
  res.render('admin');

  // get sockets
  var sockets = c.get();

  sockets.on('connection', function(socket){
    console.log('this is in controller!');

    socket.emit('id', {"id": 1});

    socket.on('cb', function(data){
      console.log('on callback!');
      console.log('cb-->' + data);
    });

    socket.on('disconnect', function(){
      console.log('client disconnect!!!');
    });
  });
};

