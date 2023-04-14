const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/httperror");
const axio = require("axios");

const searchStudent = async (req, res, next) => {
  const name = req.body.name;

  // Retrieve student data from API endpoint
  const response = await axio.get("http://localhost:3000/students");
  //   console.log(response.data);
  let Students = response.data.students.filter(
    (student) => student.name === name
  );
  //   console.log(Students);
  if (Students.length === 0) {
    const error = new HttpError("No students found for the provided name", 404);
    return res.status(error.code || 500).json({ message: error.message });
  }

  res.json({ student: Students });
};
exports.searchStudent = searchStudent;
