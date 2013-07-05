/**
 * admin sockets.
 *
 ****/

(function(){
  
  var adm = io.connect('http://localhost:8118/admin');

  // textarea for messages.
  var bufferBox = document.getElementById('bigMsg');

  // room selector
  var roomSelector = document.getElementById('roomId');
  
  // send button. send msg to server.
  var sendBtn = document.getElementById('send2server');

  // connect to server flag
  var CNECT_FLAG = false;

  adm.on('connect', function(){
    console.log('connect ok');
  });

  adm.on('a_welcome', function(data){
    console.log(data);
    CNECT_FLAG = true;
    adm.emit('a_cb', "I am at admin page!");
  });

  adm.on('s_welcome', function(data){
    console.log('Hello everyone!!!' + data);
  });

  adm.on('disconnect', function(){
    CNECT_FLAG = false;
  });

  // need to send message
  var bufferMsg;

  sendBtn.addEventListener('click', function(){

    bufferMsg = bufferBox.value;
    
    if(CNECT_FLAG){
      console.log(bufferMsg);
      adm.emit('a_cmsg', bufferMsg);
    }
  }, false);


  // socket.on('connect', function(){
  //   console.log("Hello amdin client");
  // });

  // socket.emit('cb', 'callback');

  // socket.on('id', function(data){
  //   console.log(data);
  //   alert('id');
  // });

  // var bufferBox = document.getElementById('bigMsg');
  // var roomSelector = document.getElementById('roomId');
  // var sendBtn = document.getElementById('send2server');


  // var bufferMsg = bufferBox.value;
  // var roomNum = roomSelector.value;


  // sendBtn.addEventListener('click', send2server);

  // function send2server(msg){
  //   socket.emit('bigmsg', {"value": bufferMsg});
  // }


})();


