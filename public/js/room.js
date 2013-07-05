/***
 * different rooms for clients
 ***/

(function(){

  "use strict";

  var msgBox = document.getElementById('msgTextBox');
  var msgBtn = document.getElementById('sendMsg');
  
  // value of message
  var msgValue = msgBox.value;
  
  // sockets
  var socket = io.connect('http://localhost:8118/room');


  socket.on('connect', function(){
    console.log('we are in the room!');
  });

  socket.on('c_welcome', function(msg){
    console.log(msg);
    socket.emit('c_cb', {"callback": "this is client callback!"});
  });

  socket.on('c_smsg', function(msg){
    console.log(msg);
  });

})();


