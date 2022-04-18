const { Room } = require("../../../orm");

async function createRoom(req, res) {
  try {
    console.log(req.body)
    const { title, intro, lat, long, address, datetime } = req.body;

    const createResult = await Room.create({
      title: title,
      intro: intro,
      lat: String(lat),
      long: String(long),
      address: address,
      datetime: datetime,
    });

    return res.status(200).json({ message: '방을 생성했습니다', data: createResult });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server err', data: err });
  }
}

module.exports = {
  createRoom,
}
