/****
 * This is for socket use
 * 
 * **/

function App(io){
  // var coco = {};
  
  // coco.admin = function(){
  //   var sct;
  //   io.of('/admin').

  //   return socket;
  // };
  
  
  // return coco;

  io.of('/admin').on('connection', function(socket){
    socket.emit('one', {"msg": "hello one"});
    socket.on('one_cb', function(data){
        console.log('type: ' + typeof data);
    });
  });

}

module.exports = App;


