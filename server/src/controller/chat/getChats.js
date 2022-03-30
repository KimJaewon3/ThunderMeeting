const { Chats, User, Room } = require("../../../orm");


async function getChats(req, res) {
  try {
    const { roomId } = req.body;

    const chatResult = await Chats.findAll({
      where: {
        roomId: roomId,
      },
      include: [User, Room]
    });

    console.log(chatResult);


    return res.status(200).json({ message: 'chat log', data: chatResult });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'get chat server err', data: err });
  }
}

module.exports = {
  getChats,
}
