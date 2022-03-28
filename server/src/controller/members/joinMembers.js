const { Members } = require("../../../orm");

async function joinMembers(req, res) {
  try {
    const { roomId, userId } = req.body;

    const result = await Members.findOne({
      where: {
        userId: userId,
        roomId: roomId,
      }
    });
    
    if (!result) {
      const membersResult = await Members.create({
        userId: userId,
        roomId: roomId,
      });
  
      return res.status(200).json({ message: 'join members', data: membersResult });
    } else {
      return res.status(200).json({ message: 'already members' });
    }
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'server err', data: err });
  }
}

module.exports = {
  joinMembers,
}
