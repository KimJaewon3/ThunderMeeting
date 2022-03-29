const { Server } = require('socket.io');

function webSocket(server) {
  const rooms = [];

  const io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    }
  });

  // 연결
  io.sockets.on('connection', socket => {
    console.log(`${socket.id} connect`);
    console.log(socket.rooms);

    // 연결 해제
    socket.on('disconnecting', reason => {
      console.log(reason);
    });

    // 방 참여시
    socket.on('join_room', ({ roomId, userNick }) => {
      const roomIndex = rooms.findIndex(el => el.roomId === roomId);
      // 방금 생성한 방일때
      if (roomIndex === -1) {
        rooms.push({
          roomId: roomId,
          members: [
            {
              socketId: socket.id,
              userNick: userNick
            },
          ]
        });
      } else {
        // 참여한 방이면
        rooms[roomIndex].members.push({
          socketId: socket.id,
          userNick: userNick,
        });
      }
      
      socket.join(roomId);
      io.to(roomId).emit('noti_join_room', `${userNick}님이 방에 입장하셨습니다`);
      console.log(socket.rooms);
    });

    socket.on('send_msg', ({ roomId, msgInfo }) => {
      console.log(roomId, msgInfo);
      socket.broadcast.to(roomId).emit('receive_msg', msgInfo);
    });
  });
}

module.exports = {
  webSocket,
}