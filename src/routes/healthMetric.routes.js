const express = require("express");
const router = express.Router();
const { createHealthMetric, getHealthMetrics, getHealthMetricById, updateHealthMetric, deleteHealthMetric } = require("../controllers/healthMetric.controller");

// Định nghĩa các route
router.post("/", createHealthMetric); // Thêm health metric
router.get("/", getHealthMetrics); // Lấy danh sách health metrics
router.get("/:id", getHealthMetricById); // Lấy health metric theo ID
router.put("/:id", updateHealthMetric); // Cập nhật health metric
router.delete("/:id", deleteHealthMetric); // Xóa health metric

module.exports = router;
