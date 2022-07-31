const { Chats } = require("../../../orm");


async function createChats(req, res) {
  try {
    const { content, createdAt, roomId } = req.body;
    const userId = req.userId;

    const chatResult = await Chats.create({
      userId: userId,
      roomId: roomId,
      content: content,
      createdAt: createdAt,
    });

    return res.status(200).json({ message: 'create chat', data: chatResult });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'create chat server err', data: err });
  }
}

module.exports = {
  createChats,
}
