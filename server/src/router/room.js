const { roomController } = require("../controller");

const router = require("express").Router();

router.post("/createRoom", roomController.createRoom);
router.post("/roomList", roomController.roomList);

module.exports = router;
