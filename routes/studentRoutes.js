const express = require("express");
const { check } = require("express-validator");
const studentController = require("../controller/studentsController");

const router1 = express.Router();

router1.post("/search", studentController.searchStudent);

// router1.get('/userdetail/')

module.exports = router1;
