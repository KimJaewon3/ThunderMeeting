const { roomController } = require("../controller");

const router = require("express").Router();

router.post("/createRoom", roomController.createRoom.createRoom);
router.post("/roomList", roomController.roomList.roomList);

module.exports = router;
