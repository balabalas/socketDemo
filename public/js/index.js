/***
 * At index.page
 * test socket.io
 * ***/


(function(){
  
  var socket = io.connect('http://localhost:3000/');

  // send username to server
  var subBtn = document.getElementById('sub2server');
  var msgBtn = document.getElementById('msg2server');
  var theName = document.getElementById('username');
  var msgValue = document.getElementById('message');

  subBtn.addEventListener('click', function(){
    var vname = theName.value;
    if(vname) sendName2server(vname);
  });

  msgBtn.addEventListener('click', function(){
    var vmsg = msgValue.value;
    if(vmsg) sendMsg(vmsg);
  });

  function sendName2server(name){
    socket.emit('myName', name, function(){
      console.log(arguments.length);
    });
  }

  function sendMsg(msg){
    socket.emit('msg', msg, function(){
      console.log('send msg success! --> ' + msg);
    });
  }

  socket.on('updateMsg', function(msg){
    logMsg('Message: ' + msg);
  });

  socket.on('updateNameList', function(name){
    logMsg(name);
  });

  // get message box.
  var msgBox = document.getElementById('msgBox');

  socket.on('id', function(data){
    console.log(typeof data + '---' + data);
    //setInterval(function(){
      socket.emit('cb', {hello: "world"});
    //}, 2000);
    logMsg(data);
  });
  
  socket.on('push', function(data){
//    logMsg(data);
  });

  function logMsg(msg){
    var tmpli = document.createElement('li');
    tmpli.innerText = msg + '';
    msgBox.appendChild(tmpli); 
  }

})();



