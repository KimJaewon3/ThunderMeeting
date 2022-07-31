const { User } = require("../../../orm");

async function signUp(req, res) {
  try {
    const { name, email, password, nick, mbti, phone, sex, profileImage } = req.body;
    console.log(req.body);

    const findResult = await User.findOne({
      where: {
        email: email,
      }
    });

    if (findResult) {
      return res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
    }
  
    const createResult = await User.create({
      name: name,
      email: email,
      password: password,
      nick: nick,
      mbti: mbti,
      phone: phone,
      sex: sex,
      like: 0,
      profileImage: profileImage,
    });

    return res.status(201).json({data:createResult, message:'아이디 생성!'});
  } catch {
    console.log("err", err);
    return res.status(500).json({ message: 'server err', data: err });
  }
}

module.exports = {
  signUp,
};
