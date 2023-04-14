// Import required modules
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define Block schema
const BlockSchema = new Schema({
  block_name: { type: String, required: true },
  block_capacity: { type: Number, required: true },
  type: { type: String, enum: ["boys", "girls"], required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  available: { type: Number, required: true },
});

// Define Room schema
const RoomSchema = new mongoose.Schema({
  room_name: { type: String, required: true },
  room_capacity: { type: Number, required: true },
  // furniture: { type: Object, required: true, default: {'table': 1, "chair":2}},
  isBooked: { type: Boolean, default: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "students" }],
  availability: { type: Number, required: true },

  // furniture
  Table: { type: Number, required: false },
  Chair: { type: Number, required: false },
  fan: { type: Number, required: false },
  socket: { type: Number, required: false },
  bed: { type: Number, required: false },
  cupboard: { type: Number, required: false },
  window: { type: Number, required: false },

  isDisabled: { type: Boolean, required: false },
  // data should come from dechen
  blockid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Block",
    required: true,
  },
  type: { type: String, enum: ["boys", "girls"], required: true },
});

const AcademicYear = new mongoose.Schema({
  description: { type: String, required: true },
  createdBy: { type: String, required: false }, // data sgould come from lakshey admin
  date: { type: Date, required: false },
  year: { type: Number, required: false },
});

// Allocation schema
const AllocationSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: String, required: true }, // as of now i will keep it dummy later from lakshey
  // room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  room: { type: String, required: true },
  year: { type: Number, required: true },
  // year: { type: String, required: true },
  created: { type: Date, required: false },
});

// request schema

const Request = new mongoose.Schema({
  student: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  block: { type: mongoose.Schema.Types.ObjectId, ref: "Block", required: true },
  targetroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  targetblock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Block",
    required: true,
  },
  Requested: { type: Date, required: true },
});

const DisableModelSchema = new mongoose.Schema({
  studentsid: { type: String, required: true },
  room: { type: String, required: true },
  year: { type: String, required: true },
  createdat: { type: Date, required: true },
});

// Define Block model
exports.Block = mongoose.model("Block", BlockSchema);

exports.DisableModelSchema = mongoose.model(
  "DisableModelSchema",
  DisableModelSchema
);

// Define Room model
exports.Room = mongoose.model("Room", RoomSchema);

// Define Student model

exports.Year = mongoose.model("Year", AcademicYear);

exports.Allocate = mongoose.model("Allocate", AllocationSchema);

exports.Request = mongoose.model("Request", Request);
