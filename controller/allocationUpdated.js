const mongoose = require('mongoose');
const HttpError = require('../models/httperror');
const stdb = require('../models/models');
const Allocate = stdb.Allocate;
const Room = stdb.Room;
const Block = stdb.Block;



let Student = [    
    { sid: '12190002', name: 'John', gender: 'male', course: 'computerScience', year: 'year1', room: '' },
    { sid: '12190022', name: 'Susan', gender: 'female', course: 'computerScience', year: 'year2', room: '' },    
    { sid: '12190003', name: 'Bob', gender: 'male', course: 'computerScience', year: 'year1', room: '' },    
    { sid: '12190005', name: 'David', gender: 'male', course: 'computerScience', year: 'year1', room: '' },    
    { sid: '12190004', name: 'Mark', gender: 'male', course: 'it', year: 'year1', room: '' },    
    { sid: '12190001', name: 'Jack', gender: 'male', course: 'computerScience', year: 'year2', room: '' },    
    { sid: '12190006', name: 'Tom', gender: 'male', course: 'computerScience', year: 'year2', room: '' },    
    { sid: '12190006', name: 'Peter', gender: 'male', course: 'it', year: 'year2', room: '' },    
    { sid: '12190008', name: 'Paul', gender: 'male', course: 'computerScience', year: 'year2', room: '' },    
    { sid: '12190099', name: 'Mary', gender: 'female', course: 'it', year: 'year1', room: '' },    
    { sid: '121900088', name: 'Lucy', gender: 'female', course: 'computerScience', year: 'year1', room: '' },    
    { sid: '12190077', name: 'Emma', gender: 'female', course: 'computerScience', year: 'year1', room: '' },    
    { sid: '12190066', name: 'Jane', gender: 'female', course: 'computerScience', year: 'year1', room: '' },    
    { sid: '12190054', name: 'Linda', gender: 'female', course: 'computerScience', year: 'year2', room: '' },    
    { sid: '12190033', name: 'Sara', gender: 'female', course: 'computerScience', year: 'year2', room: '' },    
    { sid: '12190021', name: 'Emily', gender: 'female', course: 'computerScience', year: 'year2', room: '' },  
  ];
exports.allocateRoomByYearAndBlock = async (req, res, next) => {
    const { year, maleBlock, femaleBlock } = req.body;
  
    try {
      // Group the students by gender and specialization
    //   const students = await Student.aggregate([
    //     { $match: { year: year } },
    //     {
    //       $group: {
    //         _id: {
    //           gender: "$gender",
    //           specialization: "$specialization",
    //         },
    //         students: {
    //           $push: {
    //             _id: "$_id",
    //             Cid: "$Cid",
    //             name: "$name",
    //             gender: "$gender",
    //             year: "$year",
    //             email: "$email",
    //             program: "$program",
    //             specialization: "$specialization",
    //             year_enrolled: "$year_enrolled",
    //             photo: "$photo",
    //           },
    //         },
    //       },
    //     },
    //   ]);
    const Students = Student.filter(student => student.year === year);
        const students = Students.reduce((groups, student) => {
        const groupKey = `${student.gender}-${student.course}`;
        const existingGroup = groups.find(group => group.key === groupKey);
        if (existingGroup) {
            existingGroup.students.push(student);
        } else {
            groups.push({
            key: groupKey,
            students: [student]
            });
        }
        return groups;
        }, []);

  
      // Shuffle the students array and roommates array for each group
    //   students.forEach((group) => {
    //     shuffleArray(group.students);
    //     group.students.forEach((student) => {
    //       shuffleArray(student.roommates);
    //     });
    //   });
  
      // Allocate rooms for each group
      for (const group of students) {
        let roomType;
        let block;
        let blockName;
        let blockId;
        let rooms;

        console.log("ggggggggggggggggggggggggggggggggggggggg",group.students)
        // Determine the block and room type based on the gender of the group
        if (group.gender === "male") {
          roomType = "boys";
        //   block = maleBlock.find((b) => b.type === "boys");
            block = Block.findById(maleBlock)
          blockName = block.block_name;
          blockId = block._id;
          rooms = block.rooms;
          console.log("fghjkjhghjk",block)
        } else if(group.gender === "female") {
          roomType = "girls";
          block = Block.findById(femaleBlock)
        //   block = femaleBlock.find((b) => b.type === "girls");
          blockName = block.block_name;
          blockId = block._id;
          rooms = block.rooms;
        }

        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr",block)
  
        // Allocate each student to a room
        for (const student of group.students) {
          let room;
  
          // Find an available room with enough capacity for the student
          for (const r of rooms) {
            const roomObj = await Room.findById(r);
            if (
              roomObj.type === roomType &&
              roomObj.availability > 0 &&
              roomObj.members.length < roomObj.room_capacity
            ) {
              room = r;
              break;
            }
          }
  
          // If a room was found, allocate the student to the room
          if (room) {
            await Room.findByIdAndUpdate(room, {
              $push: { members: student._id },
              $inc: { availability: -1 },
            });
            try{
                await Allocate.create({
                    student: student._id,
                    room: room,
                    year: year,
                  });
            }catch(err){
                console.error(err);
            }
            
          }
        }
      }
  
      res.status(201).json({ message: "Rooms allocated successfully" });
    } catch (error) {
        console.log(error);
      return next(new HttpError("Allocation failed", 500));
    }
  };
//   jnsiusdfiuasdi
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  