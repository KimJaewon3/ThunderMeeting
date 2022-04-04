const { User } = require("../../../orm");


async function modifyPw(req, res) {
  try {
    const { id, oldPw, newPw, verifyNewPw } = req.body;

    const oldPwResult = await User.findOne({
      where: {
        id: id,
        password: oldPw,
      }
    });

    if (!oldPwResult) {
      return res.status(400).json({ message: '기존 비밀번호가 일치하지 않습니다'});
    }
    if (oldPw === newPw) {
      return res.status(400).json({ message: '기존 비밀번호와 달라야합니다'});
    }
    if (newPw !== verifyNewPw) {
      return res.status(400).json({ message: '비밀번호 확인이 일치하지 않습니다'});
    }

    const newPwResult = await User.update({
      password: newPw,
    }, {
      where: {
        id: id,
      }
    });

    return res.status(200).json({ message: '비밀번호를 변경했습니다'});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'password modify server err', data: err });
  }
}

module.exports = {
  modifyPw,
}