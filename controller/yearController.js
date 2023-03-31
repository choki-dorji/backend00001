const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/httperror')

const Db = require('../models/models') 

const Block = Db.Block;
const Year = Db.Year;


const createAcademicYear = async(req, res, next) => {
    const error = validationResult(req)
    console.log(error)
    if(!error.isEmpty()){
        next(new HttpError('Invalid inputs, please check your data. ', 422))
        
    }
    const date = new Date();
    let year = date.getFullYear();
    const {description} = req.body;
  
    const createdYear = new Year({
      description: description,
      createdBy: "admin",
      date: date,
      year: year
  })

    let existingYear
    try {
        existingYear = await Year.findOne({ year: year })
    } catch (err) {
      console.log()
      const error = new HttpError('sth Failed, try again later', 500)
      return res.status(error.code || 500).json({message: error.message})

    //   return next(error)
    }
  
    if (existingYear) {
      const error = new HttpError('You have already created academic year for this year', 422)

      return next(error)
    }

    try {
        await createdYear.save()
      } catch (err) {
        console.log(err)
        const error = new HttpError('creating Academic session failed, please try again', 500)
        return next(error)
      }
    
      res.status(201).json({ year : createdYear.toObject({ getters: true }) })
    }


    exports.createAcademicYear = createAcademicYear