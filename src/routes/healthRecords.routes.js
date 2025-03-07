const express = require("express");
const router = express.Router();
const { 
    createHealthRecord, 
    getHealthRecords, 
    getHealthRecordById, 
    updateHealthRecord, 
    deleteHealthRecord,
    getHealthRecordsByAthleteAndMetric
 } = require("../controllers/healthRecords.controller");


// Định nghĩa các route
router.post("/", createHealthRecord); // Thêm health record
router.get("/", getHealthRecords); // Lấy danh sách health records
router.get("/:id", getHealthRecordById); // Lấy health record theo ID
router.get("/filter/:athlete_id/:metric_id/:fromDate/:toDate", getHealthRecordsByAthleteAndMetric); // Route mới: Lấy health records theo athlete_id & health_metric_id
router.put("/:id", updateHealthRecord); // Cập nhật health record
router.delete("/:id", deleteHealthRecord); // Xóa health record


module.exports = router;
