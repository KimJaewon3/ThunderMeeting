const { chatsController } = require("../controller");
const { verifyAccessToken } = require("../middleware/VerifyAccessToken");
const router = require("express").Router();

router.post("/createChats", verifyAccessToken, chatsController.createChats);
router.post("/getChats", chatsController.getChats);
router.delete("/deleteChats", chatsController.deleteChats);

module.exports = router;
