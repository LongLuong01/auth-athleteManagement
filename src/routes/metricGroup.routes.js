const express = require("express");
const router = express.Router();
const metricGroupController = require("../controllers/metricGroup.controller");

// // Kiểm tra console log để debug
// console.log("metricGroupController:", metricGroupController);

// Định nghĩa routes
router.get("/", metricGroupController.getMetricGroups);
router.get("/:id", metricGroupController.getMetricGroupById);
router.post("/", metricGroupController.createMetricGroup);
router.put("/:id", metricGroupController.updateMetricGroup);
router.delete("/:id", metricGroupController.deleteMetricGroup);

module.exports = router;
