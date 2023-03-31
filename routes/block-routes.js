const express = require('express');
const {check} = require('express-validator');
const blockController = require('../controller/blockController');

const router = express.Router();


router.get('/', blockController.getBlock)

router.post('/addblock',[
    check('block_name')
        .not()
        .isEmpty(),
    check('block_capacity')
        .not()
        .isEmpty(),
], blockController.createBlock)

router.delete('/:id', blockController.deleteBlock)
router.get('/:id', blockController.getBlockById)



module.exports = router;