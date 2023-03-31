const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/httperror')

const Db = require('../models/models') 

const Block = Db.Block;
const Room = Db.Room;

const admin = {
    "id": 1234,
    "name": "Tshering Zangmo",
    "email": "thserin@gmail.com", 
}


  
// //////////////////////// CREATE ROOM //////////////////////
const getRooms = async (req, res, next) => {
    let rooms;
    try{
        rooms = await Room.find({});
    }catch(err){
        const error = new HttpError('something went wrong, could not find a room', 500)
        return next(error)
    }
    res.json({rooms : rooms.map(room => room.toObject({getters: true})) })
 }


// ///////////////////////////// CREATE BLOCK  //////////////////////////////////////////
const createRoom = async(req, res, next) => {
    const error = validationResult(req)
    console.log(error)
    if(!error.isEmpty()){
        next(new HttpError('Invalid inputs, please check your data. ', 422))
        
    }
    
    const {room_name, room_capacity, isBooked, furniture, blockid} = req.body;
    
    let existingRoom
    try {
        existingRoom = await Room.findOne({ room_name: room_name })
    } catch (err) {
      const error = new HttpError('sth Failed, try again later', 500)
      return next(error)
    }
  
    if (existingRoom) {
      const error = new HttpError('room name already exists, please Login', 422)
      return next(error)
    }
    

    const createdRoom = new Room({
        room_name: room_name,
        room_capacity: room_capacity,
        furniture:furniture,
        member:[],
        availability: room_capacity,
        isBooked: isBooked,
        blockid: blockid,
    })

    let block;
    try{
        block = await Block.findById(blockid);
        console.log(block)
    }catch(e){
        console.log(e)
        const error = new HttpError(
            'Creating place failed, platry again',
            500
        )
        return next(error)
    }

    if(!block){
        const error = new HttpError('could not find block for the id', 404)
        return next(error)
    }
    if(block.rooms.length == block.block_capacity){
        return next(new HttpError('cannot create new', 422))
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdRoom.save({session: sess})
        block.rooms.push(createdRoom)
        await block.save({session: sess})
        await sess.commitTransaction();
        // await createdPlace.save();
    }catch(err){
        console.log(err)
        const error = new HttpError(
            'Creating place failed, please try again', 500
        )
        return next(error)
    }
    const jsonData = JSON.parse(createdRoom);
    res.status(201).json({room: jsonData});
}

// get room by blockid ////////////////////////////////////////////////
const getRoomByBlockId = async (req, res, next) => {
    const blockId = req.params.uid;

    let rooms
    try{
        rooms = await Room.find({ blockid: blockId});
    }catch(err){
        const error = new HttpError("fetching room failed", 500)
        // return next(error)
        return res.status(error.code || 500).json({message: error.message})
    }
    
    if(!rooms || rooms.length === 0) {
        const error = new HttpError("Couldn't find a room for the provided user id", 404)
        return res.status(error.code || 500).json({message: error.message})
      

        }
    res.json({room: rooms.map(place => place.toObject({getters: true}))  });
 }





//////////////////////////// deleteRoom //////////////////////////////////////////////
const deleteRoom = async (req, res, next) => {
    const roomId = req.params.id;
    let room;
   try{
    room = await Room.findById(roomId)

    if(!room){
        return {success: false, message: "Block not found"}

    }
    // await Room.deleteMany({ block: blockId })
    await Room.deleteOne({_id : roomId})
    
   } catch (err) {
    console.log(err)
    const error = new HttpError(
        'something went wrong could not delete', 500
    );
    return next(error);
   }
   res.json({"message": "rooom deleted"})
}



exports.createRoom = createRoom;
exports.getRooms = getRooms;
exports.deleteRoom = deleteRoom;
exports.getRoomByBlockId = getRoomByBlockId;


