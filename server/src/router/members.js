const { membersController } = require("../controller");

const router = require("express").Router();

router.post("/joinMembers", membersController.joinMembers);
router.post("/getMembers", membersController.getMembers);
router.post("/leaveMembers", membersController.leaveMembers);

module.exports = router;
