const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/httperror");

const Db = require("../models/models");

const Block = Db.Block;
const Room = Db.Room;

// //////////////////////// get ROOM //////////////////////
const getRooms = async (req, res, next) => {
  let rooms;
  try {
    rooms = await Room.find({});
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not find a room",
      500
    );
    return res.status(error.code || 500).json({ message: error.message });
  }
  res.json({ rooms: rooms.map((room) => room.toObject({ getters: true })) });
};

// ///////////////////////////// CREATE BLOCK  //////////////////////////////////////////
const createRoom = async (req, res, next) => {
  const error = validationResult(req);
  console.log(error);
  if (!error.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs, please check your data. ",
      422
    );
    return res.status(error.code || 500).json({ message: error.message });
  }
  const {
    room_name,
    room_capacity,
    isBooked,
    furniture,
    blockid,
    table,
    chair,
    fan,
    socket,
    bed,
    cupboard,
    window,
    isDisabled
  } = req.body;

  let existingRoom;
  try {
    existingRoom = await Room.findOne({ room_name: room_name });
  } catch (err) {
    const error = new HttpError("sth Failed, try again later", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (existingRoom) {
    const error = new HttpError("room name already exists, please Login", 422);
    return res.status(error.code || 500).json({ message: error.message });
  }

  let block;
  try {
    block = await Block.findById(blockid);
    console.log(block);
  } catch (e) {
    console.log(e);
    const error = new HttpError("Creating place failed, platry again", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (!block) {
    const error = new HttpError("could not find block for the id", 404);
    return res.status(error.code || 500).json({ message: error.message });
  }
  if (block.rooms.length == block.block_capacity) {
    const error = new HttpError("cannot create new", 422);
    return res.status(error.code || 500).json({ message: error.message });
  }

  const createdRoom = new Room({
    room_name: room_name,
    room_capacity: room_capacity,
    furniture: furniture,
    member: [],
    availability: room_capacity,
    isBooked: isBooked,
    blockid: blockid,
    // furniture
    Table: table,
    Chair: chair,
    fan: fan,
    socket: socket,
    bed: bed,
    cupboard: cupboard,
    window: window,
    isDisabled: isDisabled,
    type: block.type, // assign the type of block to the type of room
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdRoom.save({ session: sess });
    block.rooms.push(createdRoom);
    await block.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating place failed, please try again", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }
  res.status(201).json({ room: createdRoom });
};

// get room by blockid ////////////////////////////////////////////////
const getRoomByBlockId = async (req, res, next) => {
  const blockId = req.params.uid;

  let rooms;
  try {
    rooms = await Room.find({ blockid: blockId });
  } catch (err) {
    const error = new HttpError("fetching room failed", 500);
    // return next(error)
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (!rooms || rooms.length === 0) {
    const error = new HttpError(
      "Couldn't find a room for the provided user id",
      404
    );
    return res.status(error.code || 500).json({ message: error.message });
  }
  res.json({ room: rooms.map((place) => place.toObject({ getters: true })) });
};
//  ///////////////////SEARCH rOOM BY ID //////////////////
// search room by name
const searchRoomByName = async (req, res, next) => {
  const roomName = req.query.name; // assuming room name is passed as a query parameter

  let room;
  try {
    room = await Room.findOne({ room_name: roomName }).populate("blockid");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find room.",
      500
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (!room) {
    const error = new HttpError(
      "Could not find a room with the provided name.",
      404
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  res.json({ room: room.toObject({ getters: true }) });
};

//////////////////////////// deleteRoom //////////////////////////////////////////////
const deleteRoom = async (req, res, next) => {
  const roomId = req.params.id;
  let room;
  try {
    room = await Room.findById(roomId).populate("blockid");
  } catch (err) {
    console.log(err);
    const error = new HttpError("something went wrong could not delete", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (!room) {
    const error = new HttpError("Could not find room", 404);
    return res.status(error.code || 500).json({ message: error.message });
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Room.deleteOne({ _id: roomId }).session(sess);
    await room.blockid.updateOne({ $pull: { rooms: roomId } }).session(sess);
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete Room lower.",
      500
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  res.json({ message: "rooom deleted" });
};

exports.createRoom = createRoom;
exports.getRooms = getRooms;
exports.deleteRoom = deleteRoom;
exports.getRoomByBlockId = getRoomByBlockId;
exports.searchRoomByName = searchRoomByName;
