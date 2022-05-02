
const jwt = require("jsonwebtoken");
const { User } = require("../../orm");

async function verifyAccessToken(req, res, next) {
  const sendAlert = (msg) => {
    return res.status(401).json({
      data: 'access-token-error',
      message: msg,
    })
  }

  const authHeader = req.headers.authorization;
  
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return sendAlert('토큰이 존재하지 않습니다.\n다시 로그인 해주세요.');
  }

  const accessToken = authHeader.split(" ")[1];
  jwt.verify(accessToken, process.env.ACCESS_SECRET, async (err, decode) => {
    if (err) {
      return sendAlert('토큰이 만료 되었습니다.\n다시 로그인 해주세요.');
    }
    const userId = await User.findOne({
      where: {
        id: decode.id
      },
      attributes: ['id'],
    });
    
    if (!userId) {
      return sendAlert('아이디가 존재하지 않습니다.\n다시 로그인 해주세요.');
    } else {
      req.userId = userId.dataValues.id;
    }

    next();
  });
}

module.exports = {
  verifyAccessToken,
}
