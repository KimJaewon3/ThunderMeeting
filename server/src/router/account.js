const { accountController } = require("../controller");
const { verifyAccessToken } = require("../middleware/VerifyAccessToken");

const router = require("express").Router();

router.post("/signUp", accountController.signUp.signUp);
router.post("/signIn", accountController.signIn.singIn);
router.patch("/modifyInfo", verifyAccessToken, accountController.modifyInfo.modifyInfo);
router.patch("/modifyPw", verifyAccessToken, accountController.modifyPw.modifyPw);
router.patch("/createSangme", verifyAccessToken, accountController.createSangme.createSangme);
router.patch("/profileImg", verifyAccessToken, accountController.profileImg.profileImg);
router.get("/vaildAccount", verifyAccessToken);

module.exports = router;
