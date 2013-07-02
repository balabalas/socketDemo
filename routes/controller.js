/***
 * controller for sockets.
 * control messages distribute to different position
 ****/

var sockets = null;

exports.set = function(io){
  sockets = io.sockets;
  global.sockets = io.sockets;
};

exports.get = function(){
  var realSock = sockets || global.sockets;
  return realSock;
};

