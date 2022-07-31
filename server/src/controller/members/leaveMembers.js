const { Members } = require("../../../orm");

async function leaveMembers(req, res) {
  try {
    const { roomId } = req.body;
    const userId = req.userId;

    const result = await Members.destroy({
      where: {
        roomId: roomId,
        userId: userId,
      }
    });

    return res.status(200).json({ message: '방을 떠났습니다' });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'leave room server err', data: err });
  }
}

module.exports = {
  leaveMembers,
}
