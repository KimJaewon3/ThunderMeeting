const { User } = require("../../../orm");

async function signUp(req, res) {
  const data = req.body;
  console.log(data)

  const result = await User.create({
    ...data,
    like: 0,
  });

  return res.status(201).json({data:result, message:'아이디 생성!'});
}

module.exports = {
  signUp
};