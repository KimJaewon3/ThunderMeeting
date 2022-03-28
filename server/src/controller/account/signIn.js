const { User } = require("../../../orm");
const jwt = require("jsonwebtoken");

async function singIn(req, res) {
  try {
    const { email, password } = req.body;

    const findResult = await User.findOne({
      where: {
        email: email,
        password: password,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      },
    });

    if (!findResult) {
      return res.status(404).json({ message: 'check email or password' });
    }

    const accessToken = jwt.sign({...findResult}, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ data: {
      userInfo: findResult,
      accessToken: accessToken,
    }, message: '로그인 성공'});
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'server err', data: err });
  }
}

module.exports = {
  singIn,
}