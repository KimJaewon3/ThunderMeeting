const { membersController } = require("../controller");

const router = require("express").Router();

router.post("/joinMembers", membersController.joinMembers);
router.post("/getMembers", membersController.getMembers);

module.exports = router;
