const { User } = require("../../../orm");

async function modifyInfo(req, res) {
  try {
    const { id, name, nick, mbti, phone } = req.body;

    const modifyResult = await User.update({
      name: name,
      nick: nick,
      mbti: mbti,
      phone: phone,
    }, {
      where: {
        id: id,
      }
    });

    const infoReulst = await User.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      }
    })

    return res.status(200).json({ message: '정보 수정 완료', data: infoReulst});
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'sign modify server err', data: err });
  }
}

module.exports = {
  modifyInfo,
}
