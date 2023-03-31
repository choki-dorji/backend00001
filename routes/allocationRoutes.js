const express = require('express');
const {check} = require('express-validator');
const allocationController = require('../controller/allocationController');

const router = express.Router();


// router.get('/', blockController.getBlock)

router.post('/', allocationController.allocateRoom)
// router.post('/', (req, res)=>{
//     console.log(res.json({okay: "plaha"}))
// })





module.exports = router;