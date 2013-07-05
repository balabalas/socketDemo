/***
 * different rooms for clients
 ***/

(function(){

  "use strict";

  // Get pathname for different room ID
  var routes = window.location.pathname;
  var roomSpec = routes.replace('/room/', '').trim();

  var msgBox = document.getElementById('msgTextBox');
  var msgBtn = document.getElementById('sendMsg');

  // an *ul* that contain messages.
  var msgList = document.getElementById('msgList');

  // value of message
  var msgValue = msgBox.value;
  
  // sockets should not use __localhost__
  var socket = io.connect('http://10.2.138.164:8118/room');

  socket.on('connect', function(){
    // console.log('we are in the room!');
  });

  socket.on('c_welcome', function(msg){
    // console.log(msg);
    socket.emit('c_cb', {"callback": "this is client callback!"});
  });

  socket.on('c_smsg', function(msg){
    var li = document.createElement('li');

    if(typeof msg === 'object'){
        li.innerHTML = '<span>' + msg.message + '</span><span>     ' + msg.date + '</span>';
    } else {
        li.innerHTML = '<span>' + msg.toString() + '</span>';
    }
    
    msgList.appendChild(li);
  });

  msgBtn.addEventListener('click', function(e){
    var res = {};

    res.roomID = roomSpec;
    res.message = msgBox.value;
    res.date = new Date();

    socket.emit('c_cmsg', res);
  });

})();


