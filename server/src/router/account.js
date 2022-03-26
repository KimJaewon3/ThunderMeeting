const { accountController } = require("../controller");

const router = require("express").Router();

router.post("/signUp", accountController.signUp.signUp);

module.exports = router;
