/***
 * At index.page
 * test socket.io
 * ***/


(function(){
  
  var socket = io.connect('http://localhost:3000/');

  // get message box.
  var msgBox = document.getElementById('msgBox');

  socket.on('id', function(data){
    console.log(typeof data + '---' + data);
    setInterval(function(){
      socket.emit('cb', {hello: "world"});
    }, 2000);
    logMsg(data);
  });
  
  socket.on('push', function(data){
    logMsg(data);
  });

  function logMsg(msg){
    var tmpli = document.createElement('li');
    tmpli.innerText = msg + '';
    msgBox.appendChild(tmpli); 
  }

})();



