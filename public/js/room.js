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
  var socket = io.connect('http://localhost/room');








})();


