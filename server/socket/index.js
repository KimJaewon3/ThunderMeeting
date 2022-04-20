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
      let data;
      rooms.forEach(el => {
        el.members.forEach(member => {
          if (member.socketId === socket.id) {
            data = member.userInfo;
          }
        })
      })

      for (const room of socket.rooms) {
        if (room !== socket.id) {
          socket.to(room).emit("user_left", data);
        }
      }
    });

    // 방 참여시
    socket.on('join_room', ({ roomId, userInfo }) => {
      const roomIndex = rooms.findIndex(el => el.roomId === roomId);
      // 방금 생성한 방일때
      if (roomIndex === -1) {
        rooms.push({
          roomId: roomId,
          members: [
            {
              socketId: socket.id,
              userInfo: userInfo
            },
          ]
        });
      } else {
        // 참여한 방이면
        rooms[roomIndex].members.push({
          socketId: socket.id,
          userInfo: userInfo,
        });
      }
      
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('noti_join_room', userInfo);
      console.log(socket.rooms);
    });

    socket.on('send_msg', ({ roomId, msgInfo }) => {
      console.log(roomId, msgInfo);
      socket.broadcast.to(roomId).emit('receive_msg', msgInfo);
    });

    socket.on('send_confirm_meeting', (roomInfo) => {
      console.log(roomInfo)
      socket.broadcast.to(roomInfo.id).emit('alert_confirm_meeting', roomInfo);
    });
  });
}

module.exports = {
  webSocket,
}