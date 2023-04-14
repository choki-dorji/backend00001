const express = require("express");
const { check } = require("express-validator");
const User = require("../controller/User");

const router1 = express.Router();

router1.get("/:uid", User.getRoommates);

router1.get("/studentdetail/:id", User.personalDetail);

router1.get("/furniture/:id", User.roomFurniture);

router1.post("/roomchange/:id", User.hostelChangeRequest);

module.exports = router1;
