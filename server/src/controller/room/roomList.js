const { Room, Members, User } = require("../../../orm");

async function roomList(req, res) {
  try {
    // req 위치 들어올꺼임

    const listResult = await Room.findAll();

    if (!listResult) {
      return res.status(404).json({ message: '생성된 방이 없습니다' });
    }

    const reult = listResult.map(roomInfo => {
      const membersResult = await Members.findAll({
        where: {
          roomId: roomInfo.id
        }, 
        include: [User, Room],
      });
      return {roomInfo, membersResult};
    })

    return res.status(200).json({ message: '방 리스트 입니다', data: result });

  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'server err', data: err });
  }
}

module.exports = {
  roomList,
}