const { Room } = require("../../../orm");

async function deleteRoom(req, res) {
  try {
    const { roomId } = req.params

    const result = await Room.destroy({
      where: {
        id: roomId,
      }
    })
    return res.status(200).json({ message: '방을 식제했습니다' });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'delete room server err', data: err });
  }
}

module.exports = {
  deleteRoom,
}