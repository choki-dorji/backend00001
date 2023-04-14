const {validationResult} = require('express-validator')

const HttpError = require('../models/httperror')
const stdb = require('../models/models');

const models = require('../models/models')

const Block = models.Block;
const Room = models.Room;
const Request = stdb.Request;


// POST /requests - Create a new room change request
async function createRequest(req, res, next) {
  // Validate request body against the request schema

  const error = validationResult(req)
    if(!error.isEmpty()){
        next(new HttpError('Invalid inputs, please check your data. ', 422))
    } 

  const { studentid, presentblockid, presentroomid, requestedroomid, requestedblockid } = req.body;
  const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todaydate = `${year}-${month}-${day}`;

    let block
    try {
      block = await Place.findById(placeId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a place.',
        500
      );
      return next(error);
    }
  


    // Create a new request in the database
    const request = await Request.create({
      student: studentid,
      room: presentblock,
      block: presentroom,
      targetroom: requestedroom,
      targetblock: requestedblock,
      requested: todaydate,
    });

    res.json(request);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal server error');
//   }
}

module.exports = {
  createRequest,
};
