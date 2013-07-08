/**
 * admin sockets.
 *
 ****/

(function(){
  
  var adm = io.connect('http://10.2.25.23:3000/admin');

  // textarea for messages.
  var bufferBox = document.getElementById('bigMsg');

  // room selector
  var roomSelector = document.getElementById('roomId');
  
  // send button. send msg to server.
  var sendBtn = document.getElementById('send2server');

  // Rooms button
  var roomGetter = document.getElementById('getRooms');

  // connect to server flag
  var CNECT_FLAG = false;

  adm.on('connect', function(){
    // console.log('connect ok');
  });

  adm.on('a_welcome', function(data){
    // console.log(data);
    CNECT_FLAG = true;
    adm.emit('a_cb', "I am at admin page!");
  });

  adm.on('s_welcome', function(data){
    // console.log('Hello everyone!!!' + data);
  });

  adm.on('disconnect', function(){
    CNECT_FLAG = false;
  });

  adm.on('roomlist', function(msg){
    if(Array.isArray(msg)){
      console.log(msg.join(' & '));
    }
    else if(typeof msg === 'object'){
      // console.log(JSON.stringify(msg));
      for(var i in msg){
        if(msg.hasOwnProperty(i + '')){
          console.log("has: " + msg[i]);
        }
      }
    }
    else {
      console.log(msg);
    }
  });

  // need to send message
  var bufferMsg;

  roomGetter.addEventListener('click', function(){

    adm.emit('rooms', '', function(data){

      if(data) console.log('data: ' + typeof data + '---------' + data);

    });
  });

  sendBtn.addEventListener('click', function(){

    // The value of administor typed will be sent to server.
    bufferMsg = bufferBox.value;

    if(CNECT_FLAG){
      // console.log(bufferMsg);
      adm.emit('a_cmsg', bufferMsg);
    }
  }, false);


})();


