const { Members, User, Room, sequelize } = require("../../../orm");

async function getMembers(req, res) {
  try {
    const { roomId } = req.body;

    const membersResult = await Members.findAll({
      where: {
        roomId: roomId,
      },
      order: sequelize.col('createdAt'),
      include: [
        { 
          model: User,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'password',
            ]
          }
        }
      ],
    })

    return res.status(200).json({ message: 'get members', data: membersResult });
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'get members server err', data: err });
  }
}

module.exports = {
  getMembers,
}
