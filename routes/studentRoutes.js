const express = require('express');
const {check} = require('express-validator');
const studentController = require('../controller/studentsController')

const router1 = express.Router();


// router1.get('/', roomController.getRooms)

router1.get('/students/:rid', studentController.getStudentsBYRoomId)




module.exports = router1;