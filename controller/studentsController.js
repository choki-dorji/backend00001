const mongoose = require('mongoose');

const stdb = require('../models/models');
const HttpError = require('../models/httperror');

const Allocate = stdb.Allocate;
const RoomModel = stdb.Room;
const Year = stdb.Year;

const getStudentsBYRoomId = async (req, res, next) => {
  const roomId = req.params.rid;

  let students
    try{
        students = await Allocate.find({ room : roomId });
    }catch(err){
        const error = new HttpError("fetching students failed", 500)
        // return next(error)
        return res.status(error.code || 500).json({message: error.message})
    }
    console.log(students)
    
    if(!students || students.length === 0) {
        const error = new HttpError("Couldn't find a students for the provided room id", 404)
        return res.status(error.code || 500).json({message: error.message})
      

        }
    res.json({students: students.map(student => student.toObject({getters: true}))  });
 
}

exports.getStudentsBYRoomId = getStudentsBYRoomId;