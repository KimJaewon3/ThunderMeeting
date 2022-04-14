const { User } = require("../../../orm");

async function createSangme(req, res) {
  try {
    console.log(req.body);
    const { id, sangme } = req.body;
    
    const modifyResult = await User.update({
      sangme: sangme,  
    }, {
      where: {
        id: id,
      }
    });

    return res.status(200).json({ message: '상메 수정 완료' });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'sangme server err', data: err });
  }
}

module.exports = {
  createSangme,
}
