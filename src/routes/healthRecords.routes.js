const express = require("express");
const router = express.Router();
const { createHealthRecord, getHealthRecords, getHealthRecordById, updateHealthRecord, deleteHealthRecord } = require("../controllers/healthRecords.controller");

// Định nghĩa các route
router.post("/", createHealthRecord); // Thêm health record
router.get("/", getHealthRecords); // Lấy danh sách health records
router.get("/:id", getHealthRecordById); // Lấy health record theo ID
router.put("/:id", updateHealthRecord); // Cập nhật health record
router.delete("/:id", deleteHealthRecord); // Xóa health record

module.exports = router;
