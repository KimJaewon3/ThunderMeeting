const { Room, Members, Chats } = require("../../../orm");

async function deleteRoom(req, res) {
  try {
    const { roomId } = req.params;

    const chatsResult = await Chats.destroy({
      where: {
        roomId: roomId,
      }
    });

    const membersResult = await Members.destroy({
      where: {
        roomId: roomId,
      }
    });

    const result = await Room.destroy({
      where: {
        id: roomId,
      }
    });

    return res.status(200).json({ message: '방, 맴버, 채팅을 식제했습니다' });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'delete room server err', data: err });
  }
}

module.exports = {
  deleteRoom,
}