const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const blockRoutes = require('./routes/block-routes');
const HttpError = require('./models/httperror');
const roomRoutes = require('./routes/room-routes');
const acadYear = require('./routes/academicYear')
const allocate = require('./routes/allocationRoutes');
const std = require('./routes/studentRoutes');

const app = express();


app.use(bodyParser.json())

app.use('/block',blockRoutes)

app.use('/room', roomRoutes)

app.use('/acad', acadYear)

app.use('/allocate', allocate)

app.use('/roomstud', std)


app.use((req, res, next) => {
    const error = new HttpError('could not find this route',404)
    throw error
})

app.use((error, req, res, next) => {
    if(!res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || "An error occurred! "})
})


mongoose
    .connect('mongodb+srv://manu:Bumthap123@cluster0.zvya7ut.mongodb.net/Blocks?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000)
        console.log('connect to datbase')
    })
    .catch((error) =>{
        console.log(error)
    })
