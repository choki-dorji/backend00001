// const mongoose = require('mongoose');

// const stdb = require('../models/models')
// const HttpError = require('../models/httperror')

// const Allocate = stdb.Allocate;
// let Rooms = stdb.Room;
// const Year = stdb.AcademicYear;

// const students = [
//   {sid: '12190002', name: 'John', gender: 'male', course: 'computerScience', year: 'year1', room: '' },
//   {sid: '12190003', name: 'Bob', gender: 'male', course: 'computerScience', year: 'year1', room: '' },
//   {sid: '12190005', name: 'David', gender: 'male', course: 'computerScience', year: 'year1', room: '' },
//   {sid: '12190004', name: 'Mark', gender: 'male', course: 'computerScience', year: 'year1', room: '' },
//   {sid: '12190001', name: 'Jack', gender: 'male', course: 'computerScience', year: 'year2', room: '' },
//   {sid: '12190006', name: 'Tom', gender: 'male', course: 'computerScience', year: 'year2', room: '' },
//   {sid: '12190006', name: 'Peter', gender: 'male', course: 'computerScience', year: 'year2', room: '' },
//   {sid: '12190008', name: 'Paul', gender: 'male', course: 'computerScience', year: 'year2', room: '' },
//   {sid: '12190099', name: 'Mary', gender: 'female', course: 'computerScience', year: 'year1', room: '' },
//   {sid: '121900088', name: 'Lucy', gender: 'female', course: 'computerScience', year: 'year1', room: '' },
//   {sid: '12190077', name: 'Emma', gender: 'female', course: 'computerScience', year: 'year1', room: '' },
//   {sid: '12190066', name: 'Jane', gender: 'female', course: 'computerScience', year: 'year1', room: '' },
//   {sid: '12190054', name: 'Linda', gender: 'female', course: 'computerScience', year: 'year2', room: '' },
//   {sid: '12190033', name: 'Sara', gender: 'female', course: 'computerScience', year: 'year2', room: '' },
//   {sid: '12190021', name: 'Emily', gender: 'female', course: 'computerScience', year: 'year2', room: '' },
//   {sid: '12190022', name: 'Susan', gender: 'female', course: 'computerScience', year: 'year2', room: '' }
// ];



// // const students = [
// //     {
// //       "Cid": "1234",
// //       "name": "John Doe",
// //       "gender": "M",
// //       "year": 1,
// //       "email": "johndoe@example.com",
// //       "program": "Computer Science",
// //       "specialization": "AI",
// //       "year_enrolled": 2020,
// //       "photo": "https://randomuser.me/api/portraits/men/1.jpg"
// //     },
// //     {
// //       "Cid": "5678",
// //       "name": "Jane Smith",
// //       "gender": "F",
// //       "year": 2,
// //       "email": "janesmith@example.com",
// //       "program": "Block Chain",
// //       "specialization": "BC",
// //       "year_enrolled": 2019,
// //       "photo": "https://randomuser.me/api/portraits/women/2.jpg"
// //     },
// //     {
// //       "Cid": "9012",
// //       "name": "Bob Johnson",
// //       "gender": "M",
// //       "year": 3,
// //       "email": "bobjohnson@example.com",
// //       "program": "FS",
// //       "specialization": "AI",
// //       "year_enrolled": 2021,
// //       "photo": "https://randomuser.me/api/portraits/men/3.jpg"
// //     },
// //     {
// //       "Cid": "3456",
// //       "name": "Emily Lee",
// //       "gender": "F",
// //       "year": 2,
// //       "email": "emilylee@example.com",
// //       "program": "FS",
// //       "specialization": "FS",
// //       "year_enrolled": 2020,
// //       "photo": "https://randomuser.me/api/portraits/women/4.jpg"
// //     },
// //     {
// //       "Cid": "7890",
// //       "name": "Alex Chen",
// //       "gender": "M",
// //       "year": 3,
// //       "email": "alexchen@example.com",
// //       "program": "AI",
// //       "specialization": "AI",
// //       "year_enrolled": 2019,
// //       "photo": "https://randomuser.me/api/portraits/men/5.jpg"
// //     },
// //     {
// //       "Cid": "2345",
// //       "name": "Alicia Davis",
// //       "gender": "F",
// //       "year": 2,
// //       "email": "aliciadavis@example.com",
// //       "program": "AI",
// //       "specialization": "BC",
// //       "year_enrolled": 2021,
// //       "photo": "https://randomuser.me/api/portraits/women/6.jpg"
// //     },
// //     {
// //       "Cid": "6789",
// //       "name": "Tom Wilson",
// //       "gender": "M",
// //       "year": 2,
// //       "email": "AI",
// //       "program": "Electrical Engineering",
// //       "specialization": "AI",
// //       "year_enrolled": 2020,
// //       "photo": "https://randomuser.me/api/portraits/men/7.jpg"
// //     },
// //     {
// //       "Cid": "0123",
// //       "name": "Lena Kim",
// //       "gender": "F",
// //       "year": 3,
// //       "email": "lenakim@example.com",
// //       "program": "BC",
// //       "specialization": "BC",
// //       "year_enrolled": 2019,
// //       "photo": "https://randomuser.me/api/portraits/women/8.jpg"
// //     },
// //     {
// //       "Cid": "4567",
// //       "name": "Jack Chen",
// //       "gender": "M",
// //       "year": 2,
// //       "email": "jackchen@example.com",
// //       "program": "FS",
// //       "specialization": "FS",
// //       "year_enrolled": 2019,
// //       "photo": "https://randomuser.me/api/portraits/men/8.jpg"
// //     },
// //     {
// //         "Cid": "1234",
// //         "name": "John Doe",
// //         "gender": "M",
// //         "year": 2,
// //         "email": "johndoe@example.com",
// //         "program": "AI",
// //         "specialization": "FS",
// //         "year_enrolled": 2020,
// //         "photo": "https://randomuser.me/api/portraits/men/1.jpg"
// //       },
// //       {
// //         "Cid": "5678",
// //         "name": "Jane Smith",
// //         "gender": "F",
// //         "year": 3,
// //         "email": "janesmith@example.com",
// //         "program": "AI",
// //         "specialization": "AI",
// //         "year_enrolled": 2019,
// //         "photo": "https://randomuser.me/api/portraits/women/2.jpg"
// //       },
// //       {
// //         "Cid": "9012",
// //         "name": "Bob Johnson",
// //         "gender": "M",
// //         "year": 1,
// //         "email": "bobjohnson@example.com",
// //         "program": "AI",
// //         "specialization": "FS",
// //         "year_enrolled": 2021,
// //         "photo": "https://randomuser.me/api/portraits/men/3.jpg"
// //       },
// //       {
// //         "Cid": "3456",
// //         "name": "Emily Lee",
// //         "gender": "F",
// //         "year": 3,
// //         "email": "emilylee@example.com",
// //         "program": "BC",
// //         "specialization": "BC",
// //         "year_enrolled": 2020,
// //         "photo": "https://randomuser.me/api/portraits/women/4.jpg"
// //       },
// //       {
// //         "Cid": "7890",
// //         "name": "Alex Chen",
// //         "gender": "M",
// //         "year": 1,
// //         "email": "alexchen@example.com",
// //         "program": "BC",
// //         "specialization": "BC",
// //         "year_enrolled": 2019,
// //         "photo": "https://randomuser.me/api/portraits/men/5.jpg"
// //       },
// //       {
// //         "Cid": "2345",
// //         "name": "Alicia Davis",
// //         "gender": "F",
// //         "year": 1,
// //         "email": "aliciadavis@example.com",
// //         "program": "FS",
// //         "specialization": "BC",
// //         "year_enrolled": 2021,
// //         "photo": "https://randomuser.me/api/portraits/women/6.jpg"
// //       },
// //       {
// //         "Cid": "6789",
// //         "name": "Tom Wilson",
// //         "gender": "M",
// //         "year": 1,
// //         "email": "tomwilson@example.com",
// //         "program": "BC",
// //         "specialization": "BC",
// //         "year_enrolled": 2020,
// //         "photo": "https://randomuser.me/api/portraits/men/7.jpg"
// //       },
// //       {
// //         "Cid": "0123",
// //         "name": "Lena Kim",
// //         "gender": "F",
// //         "year": 1,
// //         "email": "lenakim@example.com",
// //         "program": "FS",
// //         "specialization": "AI",
// //         "year_enrolled": 2019,
// //         "photo": "https://randomuser.me/api/portraits/women/8.jpg"
// //       },
// //       {
// //         "Cid": "4567",
// //         "name": "Jack Chen",
// //         "gender": "M",
// //         "year": 2,
// //         "email": "jackchen@example.com",
// //         "program": "AI",
// //         "specialization": "BC",
// //         "year_enrolled": 2019,
// //         "photo": "https://randomuser.me/api/portraits/men/8.jpg"
// //       }
// // ]
      

// // Room allocation system
// //  Rooms = [
// //   { id: 1, capacity: 6, availability: 6 },
// //   { id: 2, capacity: 5, availability: 5 },
// //   { id: 3, capacity: 5, availability: 5 },
// //   // Other rooms...
// // ];

// let student;
// let list =[]

// // const {block_name, block_capacity, type} = req.body;

// const allocateRoom = async (req, res, next) => {
// // Group students by gender, course, and year
// const groupedStudents = {};
// for (student of students) {
//   if (!groupedStudents[student.gender]) {
//     groupedStudents[student.gender] = {};
//   }
//   if (!groupedStudents[student.gender][student.course]) {
//     groupedStudents[student.gender][student.course] = {};
//   }
//   if (!groupedStudents[student.gender][student.course][student.year]) {
//     groupedStudents[student.gender][student.course][student.year] = [];
//   }
//   groupedStudents[student.gender][student.course][student.year].push(student);
// }

// // Assign rooms to students
// for (const gender in groupedStudents) {
//   for (const course in groupedStudents[gender]) {
//     for (const year in groupedStudents[gender][course]) {
//       const students = groupedStudents[gender][course][year];
//       const totalStudents = students.length;

//       // const x = await Rooms.find()
//       // console.log(x[0].isBooked)

//       // Loop through each student in the group
//       for (let i = 0; i < totalStudents; i++) {
//         const student = students[i];

//         // Find an available room with enough capacity
//         // const room = await Rooms.find((r) => r.availability >= 1 && r.capacity >= 1);
        

//         let room;
//         const x = await Rooms.find()
//         console.log("length", x.length)
//         for (let i = 0; i < x.length; i++) {
//           // console.log("room", x[i])
//           if (x[i].availability >= 1 && x[i].capacity >= 1) {
//             console.log("capacity")
//             room = x[i];
//             // cosole.log(room)
//             break;
//           }
//         }


//         if (room) {
//           // Assign the student to the room
//           student.room = room.id;
//           room.availability--;
          

//           // Log the assigned room for the student
//           console.log(student)
//           list.push(student)
          
//         const date = new Date();
//         let curyear = date.getFullYear();

//     let years
//     try {
//         years = await Year.findOne({ year: curyear })
//     } catch (err) {
//       const error = new HttpError('no academic year, Try again later', 500)
//       return next(error)
//     }
  

//     // if(Block.rooms.length > Block.block_capacity){
//     // const error = new HttpError('cannot create room', 422)
//     //   return next(error)
//     // }
//     console.log(student.name , student.room)
//     const createAllocation = new Allocate({
//         student: student.name,
//         room: student.room, 
//         year: year, 
//         createdBy: "admin",
//     })

//     try {
//       const sess = await mongoose.startSession();
//       sess.startTransaction();
//       await createAllocation.save({session: sess})
//       Rooms.member.push(createdRoom)
//       await Rooms.save({session: sess})
//       await sess.commitTransaction();

//         // await createAllocation.save()
//       } catch (err) {
//         console.log(err)
//         return next(new HttpError('allocating  failed, please try again', 500))
//       }
    
//       res.status(201).json({ students : createAllocation.toObject({ getters: true }) })




//           console.log(`Assigned ${student.name} to room ${room.id}  ${student.gender}`);
//         } else {
//           console.log(`No available room for student ${student.name}  ${student.gender}`);
//         }
//       }
//     }
//   }
// }
//  return res.json(list);

// }


// exports.allocateRoom = allocateRoom;

const mongoose = require('mongoose');

const stdb = require('../models/models');
const HttpError = require('../models/httperror');

const Allocate = stdb.Allocate;
const RoomModel = stdb.Room;
const Year = stdb.Year;

const students = [
    {sid: '12190002', name: 'John', gender: 'male', course: 'computerScience', year: 'year1', room: '' },
    {sid: '12190022', name: 'Susan', gender: 'female', course: 'computerScience', year: 'year2', room: '' },

    {sid: '12190003', name: 'Bob', gender: 'male', course: 'computerScience', year: 'year1', room: '' },
    {sid: '12190005', name: 'David', gender: 'male', course: 'computerScience', year: 'year1', room: '' },
    {sid: '12190004', name: 'Mark', gender: 'male', course: 'computerScience', year: 'year1', room: '' },

    {sid: '12190001', name: 'Jack', gender: 'male', course: 'computerScience', year: 'year2', room: '' },
    {sid: '12190006', name: 'Tom', gender: 'male', course: 'computerScience', year: 'year2', room: '' },
    {sid: '12190006', name: 'Peter', gender: 'male', course: 'computerScience', year: 'year2', room: '' },
    {sid: '12190008', name: 'Paul', gender: 'male', course: 'computerScience', year: 'year2', room: '' },
    {sid: '12190099', name: 'Mary', gender: 'female', course: 'computerScience', year: 'year1', room: '' },
    {sid: '121900088', name: 'Lucy', gender: 'female', course: 'computerScience', year: 'year1', room: '' },
    {sid: '12190077', name: 'Emma', gender: 'female', course: 'computerScience', year: 'year1', room: '' },
    {sid: '12190066', name: 'Jane', gender: 'female', course: 'computerScience', year: 'year1', room: '' },
    {sid: '12190054', name: 'Linda', gender: 'female', course: 'computerScience', year: 'year2', room: '' },
    {sid: '12190033', name: 'Sara', gender: 'female', course: 'computerScience', year: 'year2', room: '' },
    {sid: '12190021', name: 'Emily', gender: 'female', course: 'computerScience', year: 'year2', room: '' },
  ];

const allocateRoom = async (req, res, next) => {
  // Group students by gender, course, and year
  const groupedStudents = {};
  for (const student of students) {
    // Your grouping logic
    if (!groupedStudents[student.gender]) {
          groupedStudents[student.gender] = {};
        }
        if (!groupedStudents[student.gender][student.course]) {
          groupedStudents[student.gender][student.course] = {};
        }
        if (!groupedStudents[student.gender][student.course][student.year]) {
          groupedStudents[student.gender][student.course][student.year] = [];
        }
        groupedStudents[student.gender][student.course][student.year].push(student);
      }
      
  

  // Assign rooms to students
  for (const gender in groupedStudents) {
    for (const course in groupedStudents[gender]) {
      for (const year in groupedStudents[gender][course]) {
        const studentsGroup = groupedStudents[gender][course][year];
        const totalStudents = studentsGroup.length;

        // Loop through each student in the group
        for (let i = 0; i < totalStudents; i++) {
          const student = studentsGroup[i];

          // Find an available room with enough capacity
          let room;
          const rooms = await RoomModel.find({ availability: { $gte: 1 }, room_capacity: { $gte: 1 } });
          // console.log("sjshfjsh")
          // console.log(rooms)

          if (rooms && rooms.length > 0) {
            room = rooms[0];
          }

          if (room) {
            // Assign the student to the room
            student.room = room._id;
            room.availability--;

            // Update the room in the database
            await RoomModel.updateOne({ _id: room._id }, { availability: room.availability });

            // Log the assigned room for the student
            // console.log(student);

            // Allocation logic
            const date = new Date();
            let curyear = date.getFullYear();
            console.log(curyear);

            let years;
            try {
              years = await Year.findOne({ year: curyear });
              // console.log('year', years)

            } catch (err) {
              const error = new HttpError('no academic year, Try again later', 500);
              return next(error);
            }

            // console.log('year', years.year)


            const createAllocation = new Allocate({
              student: student.name,
              room: student.room,
              year: years._id,
              createdBy: 'admin',
            });

            let givenroom;
    try{
      givenroom = await RoomModel.findById(student.room);
    }catch(e){
        const error = new HttpError(
            'searching room failed, platry again',
            500
        )
        // return next(error)
        return res.status(error.code || 500).json({message: error.message})
    }

    if(!givenroom){
        const error = new HttpError('could not find room for the id', 404)
        // return next(error)
        return res.status(error.code || 500).json({message: error.message})
    }


            try {
              const sess = await mongoose.startSession();
              sess.startTransaction();
              await createAllocation.save({session: sess})
              givenroom.members.push(createAllocation)
              await givenroom.save({session: sess})
              await sess.commitTransaction();



              // await createAllocation.save();
            } catch (err) {
              console.log(err);
              return next(new HttpError('allocating failed, please try again', 500));
              // console.log()
            }

            


          } else {
            console.log(`No rooms available for ${student.name}`);
          }
        }
      }
    }
  }

  res.status(201).json({ message: 'Students have been allocated to rooms.' });
};

exports.allocateRoom = allocateRoom;
