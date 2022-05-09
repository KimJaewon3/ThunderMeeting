

function vaildAccount(req, res) {
  return res.status(200).json({ message: '토큰 정상'});
}

module.exports = {
  vaildAccount,
}
