const express = require("express");
const { check } = require("express-validator");
const allocationController = require("../controller/allocationController");
const allocateDisable = require("../controller/allocateDisable");

const router = express.Router();

router.get("/", allocationController.getallocation);

router.post("/", allocationController.allocateRoomByYearAndBlock);
// router.post('/', (req, res)=>{
//     console.log(res.json({okay: "plaha"}))
// })

router.post("/search", allocationController.report);
router.get("/total/:bid", allocationController.getTotalCapacityByBlock);

router.get("/disable", allocateDisable.displayDisble);
router.post("/adddisable", allocateDisable.DisableAllocation);

module.exports = router;
