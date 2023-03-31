const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/httperror')

const Db = require('../models/models') 

const Block = Db.Block;
const Room = Db.Room;
// ///////////////////////////// GET BLOCK  //////////////////////////////////////////
const getBlock = async (req, res, next) => {
    let blocks;
    try{
        blocks = await Block.find({})
    } catch(err){
        const error = new HttpError(
            'Fetching Block failed', 500
        )
        return next(error)
    }
    res.json({Block: blocks.map(block => block.toObject({getters: true}))})
}

// ////////////////////////////GET BY iD ///////////////////////////
const getBlockById = async (req, res, next) => {
    const blockId = req.params.id;
    console.log(blockId)
    
    let blocks;
    try{
        blocks = await Block.findById(blockId);
        console.log(blocks)
    }catch(err){
        const error = new HttpError('something went wrong, could not find a block', 500)
        return next(error)
    }
    
    if(!blocks){
        const error = new HttpError("Could not find an block for the provided id", 404)
        return next(error)

    }

    // const roomid = blocks.rooms
    // let rooms
    // try{
    //     rooms = await Block.find({ rooms: roomidId });
    // }catch(err){
    //     const error = new HttpError("fetching place failed", 500)
    //     return next(error)
    // }
    
   

    res.json({
        block: blocks.toObject({getters: true}),
        // rooms: rooms.map(room => room.toObject({getters: true}))
    
    })
 }

////////////////////////////// CREATE BLOCK  //////////////////////////////////////////
const createBlock = async(req, res, next) => {

    const error = validationResult(req)
    if(!error.isEmpty()){
        next(new HttpError('Invalid inputs, please check your data. ', 422))
    }
    const {block_name, block_capacity, type} = req.body;
    
    let existingBlock
    try {
        existingBlock = await Block.findOne({ block_name: block_name })
    } catch (err) {
      const error = new HttpError('Creating Block Failed, Try again later', 500)
      return next(error)
    }
  
    if (existingBlock) {
      const error = new HttpError('Block with the provided name already exist', 422)
      return next(error)
    }

    // if(Block.rooms.length > Block.block_capacity){
    // const error = new HttpError('cannot create room', 422)
    //   return next(error)
    // }


    const createdBlock = new Block({
        block_name: block_name,
        block_capacity: block_capacity,
        rooms:[],
        type: type
    })

    try {
        await createdBlock.save()
      } catch (err) {
        console.log(err)
        const error = new HttpError('creating Block failed, please try again', 500)
        return next(error)
      }
    
      res.status(201).json({ block : createdBlock.toObject({ getters: true }) })
    }

// ////////////////// DELETE BLOCK ///////////////////
    const deleteBlock = async (req, res, next) => {
        const blockId = req.params.id;
        let block;
       try{
        block = await Block.findById(blockId)

        if(!block){
            return {success: false, message: "Block not found"}

        }
        // await Room.deleteMany({ block: blockId })
        await Block.deleteOne({_id : blockId})
        
       } catch (err) {
        console.log(err)
        const error = new HttpError(
            'something went wrong could not delete', 500
        );
        return next(error);
       }
       res.json({"message": "Block deleted"})
    }

// ///////////////////////////////////////// by block id /////////////////////////////////
// const getRoomByBlockId = async (req, res, next) => {
//     const blockId = req.params.id;

//     let rooms
//     try{
//         rooms = await Block.find({ rooms: blockId });
//     }catch(err){
//         const error = new HttpError("fetching place failed", 500)
//         return next(error)
//     }
    
//     // if(!places || places.length === 0) {
//     //     return next(
//     //         new HttpError("Couldn't find a room for the provided user id", 404)
//     //     );

//     //     }
//     res.json({rooms: rooms.map(room => room.toObject({getters: true}))  });
//  }
    


// exports.getRoomByBlockId = getRoomByBlockId
exports.getBlockById = getBlockById
exports.deleteBlock = deleteBlock;
exports.createBlock = createBlock;
exports.getBlock = getBlock;
