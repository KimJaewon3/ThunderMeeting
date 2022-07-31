const { Room, Members, User } = require("../../../orm");

async function roomList(req, res) {
  try {
    const listResult = await Room.findAll({
      attributes : {
        exclude: ['createdAt', 'updatedAt']
      }
    });

    if (!listResult) {
      return res.status(404).json({ message: '생성된 방이 없습니다' });
    }

    return res.status(200).json({ message: '방 리스트 입니다', data: listResult });

  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'server err', data: err });
  }
}

module.exports = {
  roomList,
}
