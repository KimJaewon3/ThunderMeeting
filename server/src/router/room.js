const { roomController } = require("../controller");

const router = require("express").Router();

router.post("/createRoom", roomController.createRoom);
router.post("/roomList", roomController.roomList);
router.delete("/deleteRoom/:roomId", roomController.deleteRoom);
router.patch("/confirmMeeting", roomController.confirmMeeting);
router.get("/getMeetingList/:userId", roomController.getMeetingList);

module.exports = router;
