const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { exportEmployeeData } = require("../controllers/exportController");
const router = express.Router();

router.get("/export", exportEmployeeData);

module.exports = router;
