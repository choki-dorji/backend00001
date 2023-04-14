const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/httperror");

const Db = require("../models/models");

const Block = Db.Block;
const Room = Db.Room;
// ///////////////////////////// GET BLOCK  //////////////////////////////////////////
const getBlock = async (req, res, next) => {
  let blocks;
  try {
    blocks = await Block.find({});
  } catch (err) {
    const error = new HttpError("Fetching Block failed", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }
  res.json({ Block: blocks.map((block) => block.toObject({ getters: true })) });
};

// ////////////////////////////GET BY iD ///////////////////////////
const getBlockById = async (req, res, next) => {
  const blockId = req.params.id;

  let blocks;
  try {
    blocks = await Block.findById(blockId);
    console.log(blocks);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not find a block",
      500
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (!blocks) {
    const error = new HttpError(
      "Could not find an block for the provided id",
      404
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  res.json({
    block: blocks.toObject({ getters: true }),
  });
};

////////////////////////////// CREATE BLOCK  //////////////////////////////////////////
const createBlock = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs, please check your data. ",
      422
    );
    return res.status(error.code || 500).json({ message: error.message });
  }
  const { block_name, block_capacity, type } = req.body;

  let existingBlock;
  try {
    existingBlock = await Block.findOne({ block_name: block_name });
  } catch (err) {
    const error = new HttpError("Creating Block Failed, Try again later", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (existingBlock) {
    const error = new HttpError(
      "Block with the provided name already exist",
      422
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  const createdBlock = new Block({
    block_name: block_name,
    block_capacity: block_capacity,
    rooms: [],
    type: type,
    available: block_capacity,
  });

  try {
    await createdBlock.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("creating Block failed, please try again", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }

  res.status(201).json({ block: createdBlock.toObject({ getters: true }) });
};

// ////////////////// DELETE BLOCK ///////////////////
const deleteBlock = async (req, res, next) => {
  const blockId = req.params.id;
  let block;
  try {
    block = await Block.findById(blockId).populate("rooms");
  } catch (err) {
    const error = new HttpError("something went wrong could not delete", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }
  if (!block) {
    const error = new HttpError("Could not find block for this id.", 404);
    return res.status(error.code || 500).json({ message: error.message });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Room.deleteMany({ blockid: blockId }, { session });
    await Block.deleteOne({ _id: blockId }, { session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete Block lower.",
      500
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  res.json({ message: "Block deleted" });
};

exports.getBlockById = getBlockById;
exports.deleteBlock = deleteBlock;
exports.createBlock = createBlock;
exports.getBlock = getBlock;
