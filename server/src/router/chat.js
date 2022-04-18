const { chatsController } = require("../controller");
const router = require("express").Router();

router.post("/createChats", chatsController.createChats);
router.post("/getChats", chatsController.getChats);
router.delete("/deleteChats", chatsController.deleteChats);

module.exports = router;
