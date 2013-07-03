/***
 * controller for sockets.
 * control messages distribute to different position
 ****/

var sockets = null;

exports.set = function(io){
  sockets = io.of('/amdin');
  global.sockets = io.of('/admin');
};

exports.get = function(){
  var realSock = sockets || global.sockets;
  return realSock;
};

