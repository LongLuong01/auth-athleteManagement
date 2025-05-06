const HealthMetricService = require("../services/healthMetric.service");
const { logger } = require("../config/logger");

// Thêm health metric mới
const createHealthMetric = async (req, res) => {
  try {
    const id = await HealthMetricService.createHealthMetric(req.body);
    res.status(201).json({ message: "Thêm health metric thành công!", id });
  } catch (error) {
    logger.error("Lỗi khi thêm health metric:", error);
    res.status(500).json({ message: "Lỗi khi thêm health metric!" });
  }
};

// Lấy danh sách health metrics
const getHealthMetrics = async (req, res) => {
  try {
    const rows = await HealthMetricService.getHealthMetrics();
    res.status(200).json(rows);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách health metrics:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách health metrics!" });
  }
};

// Lấy health metric theo ID
const getHealthMetricById = async (req, res) => {
  try {
    const row = await HealthMetricService.getHealthMetricById(req.params.id);
    if (!row) {
      return res.status(404).json({ message: "Không tìm thấy health metric!" });
    }
    res.status(200).json(row);
  } catch (error) {
    logger.error("Lỗi khi lấy health metric:", error);
    res.status(500).json({ message: "Lỗi khi lấy health metric!" });
  }
};

// Cập nhật health metric
const updateHealthMetric = async (req, res) => {
  try {
    const affectedRows = await HealthMetricService.updateHealthMetric(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy health metric!" });
    }
    res.status(200).json({ message: "Cập nhật health metric thành công!" });
  } catch (error) {
    logger.error("Lỗi khi cập nhật health metric:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật health metric!" });
  }
};

// Xóa health metric
const deleteHealthMetric = async (req, res) => {
  try {
    const affectedRows = await HealthMetricService.deleteHealthMetric(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy health metric!" });
    }
    res.status(200).json({ message: "Xóa health metric thành công!" });
  } catch (error) {
    logger.error("Lỗi khi xóa health metric:", error);
    res.status(500).json({ message: "Lỗi khi xóa health metric!" });
  }
};

// Lấy danh sách health_metric theo metric_group_id
const getHealthMetricsByGroup = async (req, res) => {
  try {
    const rows = await HealthMetricService.getHealthMetricsByGroup(req.params.metric_group_id);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy health metrics!" });
    }
    res.status(200).json(rows);
  } catch (error) {
    logger.error("Lỗi khi lấy health metrics theo group:", error);
    res.status(500).json({ message: "Lỗi khi lấy health metrics!" });
  }
};

module.exports = { 
  createHealthMetric, 
  getHealthMetrics, 
  getHealthMetricById, 
  updateHealthMetric, 
  deleteHealthMetric,
  getHealthMetricsByGroup
};