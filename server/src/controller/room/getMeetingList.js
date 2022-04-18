const { Room, Members } = require("../../../orm");

async function getMeetingList(req, res) {
  try {
    const { userId } = req.params;

    const meetingResult = await Members.findAll({
      where: {
        userId: userId,
      },
      attributes: {
        exclude: [
          'id',
          'userId',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [
        {
          model: Room,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
            ]
          },
          
        }
      ]
    });

    const result = meetingResult.map(el => el.room);

    return res.status(200).json({ message: '약속 리스트입니다', data: result });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'get meeting list server err', data: err });
  }
}

module.exports = {
  getMeetingList,
}
