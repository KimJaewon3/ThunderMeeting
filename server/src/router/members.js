const { membersController } = require("../controller");
const { verifyAccessToken } = require("../middleware/VerifyAccessToken");

const router = require("express").Router();

router.post("/joinMembers", verifyAccessToken, membersController.joinMembers);
router.post("/getMembers", membersController.getMembers);
router.post("/leaveMembers", verifyAccessToken, membersController.leaveMembers);

module.exports = router;
