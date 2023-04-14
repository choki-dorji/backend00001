const axio = require("axios");
const stud = require("../models/models");
const rooms = stud.Room;
const Block = stud.Block;
const Request = stud.Request;
// const request = require('./models/request');

// get roomm mate
const getRoommates = async (req, res) => {
  try {
    const userId = req.params.uid;
    const room = await rooms.findOne({ members: userId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    let mate;
    let roommates = room.members;
    for (let i = 0; i < roommates.length; i++) {
      if (roommates[i] !== userId) {
        mate = roommates[i];
      }
    }
    // return all the names and description

    //
    // const roommates = room.members.filter((member) => member
    res.json({ mate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const personalDetail = async (req, res) => {
  const studentId = req.params.id;

  try {
    // Find the student by ID
    const response = await axio.get("http://localhost:3000/students");
    // console.log(response.data);
    let students = response.data.students.filter(
      (student) => student._id === studentId
    );

    // If the student is not found, return an error message
    if (!students) {
      const error = new HttpError("Student not found", 404);
      return res.status(error.code || 500).json({ message: error.message });
    }

    // Return the student details as a JSON response
    res.status(200).json({ students });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to fetch student", 500));
  }
};

// diaplay Room firniture information
const roomFurniture = async (req, res) => {
  const userId = req.params.id;
  let room;
  try {
    room = await rooms.findOne({ members: userId });
  } catch (e) {
    const error = new HttpError("Server error", 404);
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  } else {
    const furniture = {
      chair: room.Chair,
      Table: room.Table,
      fan: room.fan,
      socket: room.socket,
      bed: room.bed,
      window: room.window,
    };
    return res.json({ furniture: furniture });
  }
};

// *******************************************
// request hostel change request
// ***********************************************

const hostelChangeRequest = async (req, res) => {
  const { targetRoom, targetBlock } = req.body;
  const studentId = req.params.id; // Assuming the logged-in student's ID is stored in the `id` property of the `req.user` object
  
  try {
    // Check if the specified block exists
    const block = await Block.findOne({ block_name: targetBlock });
    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }
    
    // Check if the specified room exists in the specified block
    const room = await rooms.findOne({ room_name: targetRoom, blockid: block._id });
    if (!room) {
      return res.status(404).json({ message: "Room not found in specified block" });
    }
    
    // Check if the logged-in student's current room is in the specified block
    const currentRoom = await rooms.findOne({ members: studentId });
    if (!currentRoom) {
      return res.status(404).json({ message: "Current room not found for logged-in student" });
    }
    const currentBlock = await Block.findOne({ _id: currentRoom.blockid });
    if (!currentBlock) {
      return res.status(404).json({ message: "Current block not found for logged-in student" });
    }
    // if (currentBlock._id.toString() !== block._id.toString()) {
    //   return res.status(400).json({ message: "Current room is not in specified block" });
    // }
    
    // Check if the requested room is available
    if (room.availability === 0) {
      return res.status(400).json({ message: "Requested room is not available" });
    }
    
    // Check if the logged-in student has already made a request to change rooms
    const existingRequest = await Request.findOne({ student: studentId });
    if (existingRequest) {
      return res.status(400).json({ message: "Student already has a pending request to change rooms" });
    }
    const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

const curdate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    // Create a new request object
    const request = new Request({
      student: studentId,
      room: currentRoom._id,
      block: currentBlock._id,
      targetblock: block._id,
      targetroom: room._id,
      Requested: curdate
    });
    
    // Save the request to the database
    await request.save();
    
    // Return a success message
    return res.json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getRoommates,
  personalDetail,
  roomFurniture,
  hostelChangeRequest,
};
