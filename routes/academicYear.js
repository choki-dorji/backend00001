const express = require('express');
const {check} = require('express-validator');
// const yearController = require('../controller/yearController');
const yearController = require('../controller/yearController');

const router = express.Router();
// router.get('/', blockController.getBlock)

router.post('/createyear',[
    check('description')
        .not()
        .isEmpty(),
], yearController.createAcademicYear)




module.exports = router;