const { Room } = require("../../../orm");

async function confirmMeeting(req, res) {
  try {
    const { roomId } = req.body;

    const meetingResult = await Room.update({
      confirm: "Y",
    }, {
      where: {
        id: roomId,
      }
    });

    const roomResult = await Room.findOne({
      where: {
        id: roomId,
      }, attributes : {
        exclude: ['createdAt', 'updatedAt'],
      }
    });

    return res.status(200).json({ message: '약속을 잡았습니다', data: roomResult });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'confirm meeting server err', data: err });
  }
}

module.exports = {
  confirmMeeting,
}
