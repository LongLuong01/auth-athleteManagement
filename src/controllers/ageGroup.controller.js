const AgeGroupService = require("../services/ageGroup.service");
const { logger } = require("../config/logger");
const { validationResult } = require('express-validator');

// Thêm nhóm tuổi mới
const createAgeGroup = async (req, res) => {
  // Kiểm tra validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await AgeGroupService.createAgeGroup(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error("Lỗi khi thêm nhóm tuổi:", error);
    res.status(500).json({ message: "Lỗi khi thêm nhóm tuổi!" });
  }
};

// Lấy danh sách nhóm tuổi
const getAgeGroups = async (req, res) => {
  try {
    const rows = await AgeGroupService.getAgeGroups();
    res.status(200).json(rows);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách nhóm tuổi:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhóm tuổi!" });
  }
};

// Lấy nhóm tuổi theo ID
const getAgeGroupById = async (req, res) => {
  try {
    const row = await AgeGroupService.getAgeGroupById(req.params.id);
    if (!row) {
      return res.status(404).json({ message: "Nhóm tuổi không tồn tại!" });
    }
    res.status(200).json(row);
  } catch (error) {
    logger.error("Lỗi khi lấy nhóm tuổi:", error);
    res.status(500).json({ message: "Lỗi khi lấy nhóm tuổi!" });
  }
};

// Cập nhật nhóm tuổi
const updateAgeGroup = async (req, res) => {
  // Kiểm tra validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const affectedRows = await AgeGroupService.updateAgeGroup(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Nhóm tuổi không tồn tại!" });
    }
    res.status(200).json({ message: "Cập nhật nhóm tuổi thành công!" });
  } catch (error) {
    logger.error("Lỗi khi cập nhật nhóm tuổi:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật nhóm tuổi!" });
  }
};

// Xóa nhóm tuổi
const deleteAgeGroup = async (req, res) => {
  try {
    const affectedRows = await AgeGroupService.deleteAgeGroup(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Nhóm tuổi không tồn tại!" });
    }
    res.status(200).json({ message: "Xóa nhóm tuổi thành công!" });
  } catch (error) {
    logger.error("Lỗi khi xóa nhóm tuổi:", error);
    res.status(500).json({ message: "Lỗi khi xóa nhóm tuổi!" });
  }
};

module.exports = {
  createAgeGroup,
  getAgeGroups,
  getAgeGroupById,
  updateAgeGroup,
  deleteAgeGroup
};