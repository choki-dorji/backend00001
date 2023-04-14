const express = require('express');
const {check} = require('express-validator');
const requestController = require('../controller/requestController')

const router = express.Router();


// router.get('/', blockController.getBlock)

router.post('/addrequest',[

    check('studentname')
        .not()
        .isEmpty(),
    check('presentroom')
        .not()
        .isEmpty(),
    check('presentblock')
        .not()
        .isEmpty(),
    check('requestedroom')
        .not()
        .isEmpty(),
    check('requestedblock')
        .not()
        .isEmpty(),
], requestController.createRequest)

// router.delete('/:id', blockController.deleteBlock)
// router.get('/:id', blockController.getBlockById)



module.exports = router;