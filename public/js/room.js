/***
 * different rooms for clients
 ***/

(function(){

  "use strict";

  // Get pathname for different room ID
  var routes = window.location.pathname;
  // filter 'room' at routes.
  var roomSpec = routes.trim().split('/').slice(1).join(' ');

  var msgBox = document.getElementById('msgTextBox');
  var msgBtn = document.getElementById('sendMsg');

  // an *ul* that contain messages.
  var msgList = document.getElementById('msgList');

  // value of message
  var msgValue = msgBox.value;
  
  // sockets should not use __localhost__
  var socket = io.connect('http://10.2.138.164:8118/room');

  socket.on('connect', function(){
    console.log('we are in the room!');
    // socket.emit('c_cb', {"roomID": roomSpec})
  });

  socket.on('c_welcome', function(msg){
    // console.log(msg);
    socket.emit('c_cb', {"roomID": roomSpec});
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

  // when click message send button. send rooms, date and message.
  msgBtn.addEventListener('click', function(e){
    var res = {};

    res.roomID = roomSpec;
    res.message = msgBox.value;
    res.date = new Date();

    msgBox.value = '';

    socket.emit('c_cmsg', res);
  });

})();


