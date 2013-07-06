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
      console.log(msg);
      allChanel.emit('s_smsg', 'At server: ' + msg);
      room.emit('c_smsg', msg);
    });
  });

  io.of('/room').on('connection', function(socket){

    var roomSpec = '';

    socket.emit('c_welcome', "welcome, new client.");
    socket.on('c_cb', function(msg){
      console.log(msg.roomID);
      roomSpec = msg.roomID;

      socket.join('' + roomSpec);
    });

    socket.on('c_cmsg', function(msg){
      if(typeof msg === 'object'){
        console.log(msg.roomID + '###' + msg.message + '###' + msg.date);

        // should use room instead of socket. socket may can't affect others.
        room.in(roomSpec).emit('c_smsg', msg);
      }
      else {
        console.log(msg);
      }
    });
  });

}

module.exports = App;


