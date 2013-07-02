/**
 * admin sockets.
 *
 ****/

(function(){
  
  var socket = io.connect('http://localhost:3000/admin');

  socket.on('connect', function(){
    console.log("Hello amdin client");
  });











})();


