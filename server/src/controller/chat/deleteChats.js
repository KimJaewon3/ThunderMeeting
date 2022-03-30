const { Chats } = require("../../../orm");


async function deleteChats(req, res) {
  try {
    const { roomId } = req.body;

    const chatResult = await Chats.destroy({
      where: {
        roomId: roomId,
      }
    });

    console.log(chatResult);

    return res.status(200).json({ message: 'delete chat', data: chatResult });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'delete chats server err', data: err });
  }
}

module.exports = {
  deleteChats,
}
