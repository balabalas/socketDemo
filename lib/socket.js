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

  var allChanel = io.sockets;
  var admin = io.of('/admin');
  var room = io.of('/room');

  io.of('/admin').on('connection', function(socket){
    socket.emit('a_welcome', {"msg": "hello one"});
    allChanel.emit('s_welcome', {"hello": "server"});
    socket.on('a_cb', function(data){
        // console.log('type: ' + typeof data + "--" + data);
    });

    // when client send message back
    socket.on('a_cmsg', function(msg){
      // console.log(msg);
      
      room.volatile.emit('c_smsg', msg);

    });

    socket.on('rooms', function(data){
      // console.log(); 
      socket.emit('roomlist', io.of('/room').manager.rooms);
    });

  });

  io.of('/room').on('connection', function(socket){

    var roomSpec = '';

    socket.emit('c_welcome', "welcome, new client.");
    socket.on('c_cb', function(msg){

      console.log(msg.roomID);

      roomSpec = msg.roomID;

      var rooms = roomSpec.split(' ');

      for(var i = 0, len = rooms.length; i < len; i++){
        socket.join('' + rooms[i]);
      }

      // socket.join('' + roomSpec);
    });

    socket.on('c_cmsg', function(msg){

      if(typeof msg === 'object'){
        // console.log(msg.roomID + '###' + msg.message);

        // should use room instead of socket. socket may can't affect others.
        room.in(roomSpec).emit('c_smsg', msg);

        // socket.broadcast.to(roomSpec).emit('c_smsg', msg);

      }
      else {
        console.log(msg);
      }
    });
  });

}

module.exports = App;


