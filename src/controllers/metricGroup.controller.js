const MetricGroupService = require("../services/metricGroup.service");
const { logger } = require("../config/logger");

// Thêm nhóm chỉ số sức khỏe mới
const createMetricGroup = async (req, res) => {
  try {
    const result = await MetricGroupService.createMetricGroup(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error("Lỗi khi thêm nhóm chỉ số:", error);
    res.status(500).json({ message: "Lỗi khi thêm nhóm chỉ số!" });
  }
};

// Lấy danh sách nhóm chỉ số sức khỏe
const getMetricGroups = async (req, res) => {
  try {
    const rows = await MetricGroupService.getMetricGroups();
    res.status(200).json(rows);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách nhóm chỉ số:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhóm chỉ số!" });
  }
};

// Lấy nhóm chỉ số theo ID
const getMetricGroupById = async (req, res) => {
  try {
    const row = await MetricGroupService.getMetricGroupById(req.params.id);
    if (!row) {
      return res.status(404).json({ message: "Nhóm chỉ số không tồn tại!" });
    }
    res.status(200).json(row);
  } catch (error) {
    logger.error("Lỗi khi lấy nhóm chỉ số:", error);
    res.status(500).json({ message: "Lỗi khi lấy nhóm chỉ số!" });
  }
};

// Cập nhật nhóm chỉ số
const updateMetricGroup = async (req, res) => {
  try {
    const affectedRows = await MetricGroupService.updateMetricGroup(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Nhóm chỉ số không tồn tại!" });
    }
    res.status(200).json({ message: "Cập nhật nhóm chỉ số thành công!" });
  } catch (error) {
    logger.error("Lỗi khi cập nhật nhóm chỉ số:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật nhóm chỉ số!" });
  }
};

// Xóa nhóm chỉ số
const deleteMetricGroup = async (req, res) => {
  try {
    const affectedRows = await MetricGroupService.deleteMetricGroup(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Nhóm chỉ số không tồn tại!" });
    }
    res.status(200).json({ message: "Xóa nhóm chỉ số thành công!" });
  } catch (error) {
    logger.error("Lỗi khi xóa nhóm chỉ số:", error);
    res.status(500).json({ message: "Lỗi khi xóa nhóm chỉ số!" });
  }
};

module.exports = {
  createMetricGroup,
  getMetricGroups,
  getMetricGroupById,
  updateMetricGroup,
  deleteMetricGroup,
};