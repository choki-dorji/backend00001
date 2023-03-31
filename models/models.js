// Import required modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const students = [
  {
    "Cid": "1234",
    "name": "John Doe",
    "gender": "M",
    "year": 1,
    "email": "johndoe@example.com",
    "program": "Computer Science",
    "specialization": "AI",
    "year_enrolled": 2020,
    "photo": "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    "Cid": "5678",
    "name": "Jane Smith",
    "gender": "F",
    "year": 2,
    "email": "janesmith@example.com",
    "program": "Block Chain",
    "specialization": "BC",
    "year_enrolled": 2019,
    "photo": "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    "Cid": "9012",
    "name": "Bob Johnson",
    "gender": "M",
    "year": 3,
    "email": "bobjohnson@example.com",
    "program": "FS",
    "specialization": "AI",
    "year_enrolled": 2021,
    "photo": "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    "Cid": "3456",
    "name": "Emily Lee",
    "gender": "F",
    "year": 2,
    "email": "emilylee@example.com",
    "program": "FS",
    "specialization": "FS",
    "year_enrolled": 2020,
    "photo": "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    "Cid": "7890",
    "name": "Alex Chen",
    "gender": "M",
    "year": 3,
    "email": "alexchen@example.com",
    "program": "AI",
    "specialization": "AI",
    "year_enrolled": 2019,
    "photo": "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    "Cid": "2345",
    "name": "Alicia Davis",
    "gender": "F",
    "year": 2,
    "email": "aliciadavis@example.com",
    "program": "AI",
    "specialization": "BC",
    "year_enrolled": 2021,
    "photo": "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    "Cid": "6789",
    "name": "Tom Wilson",
    "gender": "M",
    "year": 2,
    "email": "AI",
    "program": "Electrical Engineering",
    "specialization": "AI",
    "year_enrolled": 2020,
    "photo": "https://randomuser.me/api/portraits/men/7.jpg"
  },
  {
    "Cid": "0123",
    "name": "Lena Kim",
    "gender": "F",
    "year": 3,
    "email": "lenakim@example.com",
    "program": "BC",
    "specialization": "BC",
    "year_enrolled": 2019,
    "photo": "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    "Cid": "4567",
    "name": "Jack Chen",
    "gender": "M",
    "year": 2,
    "email": "jackchen@example.com",
    "program": "FS",
    "specialization": "FS",
    "year_enrolled": 2019,
    "photo": "https://randomuser.me/api/portraits/men/8.jpg"
  },
  {
      "Cid": "1234",
      "name": "John Doe",
      "gender": "M",
      "year": 2,
      "email": "johndoe@example.com",
      "program": "AI",
      "specialization": "FS",
      "year_enrolled": 2020,
      "photo": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      "Cid": "5678",
      "name": "Jane Smith",
      "gender": "F",
      "year": 3,
      "email": "janesmith@example.com",
      "program": "AI",
      "specialization": "AI",
      "year_enrolled": 2019,
      "photo": "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      "Cid": "9012",
      "name": "Bob Johnson",
      "gender": "M",
      "year": 1,
      "email": "bobjohnson@example.com",
      "program": "AI",
      "specialization": "FS",
      "year_enrolled": 2021,
      "photo": "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      "Cid": "3456",
      "name": "Emily Lee",
      "gender": "F",
      "year": 3,
      "email": "emilylee@example.com",
      "program": "BC",
      "specialization": "BC",
      "year_enrolled": 2020,
      "photo": "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      "Cid": "7890",
      "name": "Alex Chen",
      "gender": "M",
      "year": 1,
      "email": "alexchen@example.com",
      "program": "BC",
      "specialization": "BC",
      "year_enrolled": 2019,
      "photo": "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      "Cid": "2345",
      "name": "Alicia Davis",
      "gender": "F",
      "year": 1,
      "email": "aliciadavis@example.com",
      "program": "FS",
      "specialization": "BC",
      "year_enrolled": 2021,
      "photo": "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      "Cid": "6789",
      "name": "Tom Wilson",
      "gender": "M",
      "year": 1,
      "email": "tomwilson@example.com",
      "program": "BC",
      "specialization": "BC",
      "year_enrolled": 2020,
      "photo": "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
      "Cid": "0123",
      "name": "Lena Kim",
      "gender": "F",
      "year": 1,
      "email": "lenakim@example.com",
      "program": "FS",
      "specialization": "AI",
      "year_enrolled": 2019,
      "photo": "https://randomuser.me/api/portraits/women/8.jpg"
    },
    {
      "Cid": "4567",
      "name": "Jack Chen",
      "gender": "M",
      "year": 2,
      "email": "jackchen@example.com",
      "program": "AI",
      "specialization": "BC",
      "year_enrolled": 2019,
      "photo": "https://randomuser.me/api/portraits/men/8.jpg"
    }
]


// Define Block schema
const BlockSchema = new Schema({
  block_name: { type: String, required: true },
  block_capacity: { type: Number, required: true },
  type: { type: String, enum: ['boys', 'girls'], required: true },
  rooms : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' },]
});

// Define Room schema
const RoomSchema = new mongoose.Schema({
  room_name: { type: String, required: true },
  room_capacity: { type: Number, required: true },
  // furniture: { type: Object, required: true, default: {'table': 1, "chair":2}},
  isBooked: { type: Boolean, default: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }],
  availability : { type: Number, required: true },
  furniture: [{ type: String, required: false}], // data should come from dechen
  blockid: {type: mongoose.Schema.Types.ObjectId, ref: 'Block', required: true}

});

// Define Student schema
// const StudentSchema = new mongoose.Schema({ // data should come from other group
//   // Cid: { type: String, required: true },
//   name: { type: String, required: true },
//   gender: {type: String, required: true},
//   year:{type: Number, required: true},
//   // email:{type: String, required: true},
//   // program:{type: String, required: true},
//   specializations:{type: String, required: true},
//   // year_enrolled:{type: Number, required: true},
//   // photo:{type: String, required: true}


// });


const AcademicYear = new mongoose.Schema({
  description: { type: String, required: true },
  createdBy: { type: String, required: false},// data sgould come from lakshey admin
  date: { type: Date, required: false},
  year: { type: Number, required:false}

});


// Allocation schema
const AllocationSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: {type: String, required: true}, // as of now i will keep it dummy later from lakshey
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  // room: { type: String, required: true },
  year: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    // year: { type: String, required: true },

  created: {type: Date, required: false}
});











// Define Block model
exports.Block = mongoose.model('Block', BlockSchema);

// Define Room model
exports.Room = mongoose.model('Room', RoomSchema);

// Define Student model
// exports.Student = mongoose.model('Student', StudentSchema);

exports.Year = mongoose.model('Year', AcademicYear);

exports.Allocate = mongoose.model('Allocate', AllocationSchema);

// exports.StudentSchema = mongoose.model('Std', StudentSchema);

