const mongoose = require("mongoose");
const HttpError = require("../models/httperror");
const stdb = require("../models/models");
const Allocate = stdb.Allocate;
const Room = stdb.Room;
const Block = stdb.Block;

const axio = require("axios");
// ////////
// /////////
// ////////

const displayDisble = async (req, res) => {
  let students;
  try {
    // Retrieve student data from API endpoint
    const response = await axio.get("http://localhost:3000/students");
    students = response.data.students.filter(
      (student) => student.isDisabled === true
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed Fetching data", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }
  res.json({ student: students });
};

const DisableAllocation = async (req, res, next) => {
  const { sid, room } = req.body;

  let disstudent;

  try {
    // Retrieve student data from API endpoint
    const response = await axio.get("http://localhost:3000/students");
    disstudent = response.data.students.filter(
      (student) => student.isDisabled === true && student.Sid === sid
    );
    console.log(disstudent);

    // Find the room by ID
    const allocatedRoom = await Room.find({ room_name: room });

    // If the room does not exist, return an error message
    if (!allocatedRoom) {
      const error = new HttpError("The specified room does not exist", 400);
      return res.status(error.code || 500).json({ message: error.message });
    }
    const roomid = allocatedRoom[0]._id;

    // If the room does not have enough availability, return an error message
    if (allocatedRoom[0].availability < 1) {
      const error = new HttpError("The specified room is not available", 400);
      return res.status(error.code || 500).json({ message: error.message });
    }

    // Allocate the student to the room
    await Room.findByIdAndUpdate(roomid, {
      $push: { members: disstudent[0]._id },
      $inc: { availability: -1 },
    });

    // Create a new allocation record
    const now = new Date();
    const currentYear = now.getFullYear();

    // change the name of db
    await Allocate.create({
      student: disstudent[0]._id,
      room: roomid,
      year: currentYear,
      created_at: currentYear,
    });

    // Return a success message
    res.status(200).json({ message: "Student allocated to room successfully" });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Allocation failed", 500));
  }
};

exports.DisableAllocation = DisableAllocation;
exports.displayDisble = displayDisble;
