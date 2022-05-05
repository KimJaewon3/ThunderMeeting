const { User } = require("../../../orm");

async function profileImg(req, res) {
  try {
    const { url } = req.body;
    const id = req.userId;

    const updateResult = await User.update({
      profileImage: url,
    }, {
      where: {
        id: id,
      }
    });

    return res.status(200).json({ message: '프로필 사진을 변경했습니다.', data: null });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'profile image server err', data: err });
  }
}

module.exports = {
  profileImg,
}
