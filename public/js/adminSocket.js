/**
 * admin sockets.
 *
 ****/

(function(){
  
  var socket = io.connect('http://localhost:3000/admin/');

  socket.on('connect', function(){
    console.log("Hello amdin client");
  });

  socket.emit('cb', 'callback');

  socket.on('id', function(data){
    console.log(data);
    alert('id');
  });

  var bufferBox = document.getElementById('bigMsg');
  var roomSelector = document.getElementById('roomId');
  var sendBtn = document.getElementById('send2server');


  var bufferMsg = bufferBox.value;
  var roomNum = roomSelector.value;


  sendBtn.addEventListener('click', send2server);

  function send2server(msg){
    socket.emit('bigmsg', {"value": bufferMsg});
  }


})();


