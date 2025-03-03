const express = require("express");
const { addHealthRecord } = require("../controllers/healthRecords.controller");
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

// API thêm dữ liệu sức khỏe (có xác thực)
router.post("/", authenticateToken, addHealthRecord);

module.exports = router;
