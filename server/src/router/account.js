const { accountController } = require("../controller");

const router = require("express").Router();

router.post("/signUp", accountController.signUp.signUp);
router.post("/signIn", accountController.signIn.singIn);

module.exports = router;
