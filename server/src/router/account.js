const { accountController } = require("../controller");

const router = require("express").Router();

router.post("/signUp", accountController.signUp.signUp);
router.post("/signIn", accountController.signIn.singIn);
router.patch("/modifyInfo", accountController.modifyInfo.modifyInfo);
router.patch("/modifyPw", accountController.modifyPw.modifyPw);
router.patch("/createSangme", accountController.createSangme.createSangme);

module.exports = router;
