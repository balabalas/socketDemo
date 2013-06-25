/***
 * At index.page
 * test socket.io
 * ***/


(function(){
  
  var socket = io.connect('http://localhost:3000/');

  socket.on('id', function(data){
    console.log(typeof data + '---' + data);
    socket.emit('cb', {hello: "world"});
  });
  

})();



