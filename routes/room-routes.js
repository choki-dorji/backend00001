const express = require("express");
const { check } = require("express-validator");
const roomController = require("../controller/roomController");

const router1 = express.Router();

router1.get("/", roomController.getRooms);

router1.get("/room/:uid", roomController.getRoomByBlockId);

router1.post(
  "/addroom",
  [
    check("room_name").not().isEmpty(),
    check("room_capacity").not().isEmpty(),
    check("furniture_id").not().isEmpty(),
  ],
  roomController.createRoom
);

router1.get("/search", roomController.searchRoomByName);

router1.delete("/:id", roomController.deleteRoom);

module.exports = router1;
