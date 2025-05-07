const SportService = require("../services/sport.service");
const { validationResult } = require("express-validator");

const createSport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const result = await SportService.createSport(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sport!" });
  }
};

const getSports = async (req, res) => {
  try {
    const rows = await SportService.getSports();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sport!" });
  }
};

const getSportById = async (req, res) => {
  try {
    const row = await SportService.getSportById(req.params.id);
    if (!row) return res.status(404).json({ message: "Sport không tồn tại!" });
    res.status(200).json(row);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sport!" });
  }
};

const updateSport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const affectedRows = await SportService.updateSport(req.params.id, req.body);
    if (affectedRows === 0) return res.status(404).json({ message: "Sport không tồn tại!" });
    res.status(200).json({ message: "Cập nhật sport thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sport!" });
  }
};

const deleteSport = async (req, res) => {
  try {
    const affectedRows = await SportService.deleteSport(req.params.id);
    if (affectedRows === 0) return res.status(404).json({ message: "Sport không tồn tại!" });
    res.status(200).json({ message: "Xóa sport thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sport!" });
  }
};

module.exports = {
  createSport,
  getSports,
  getSportById,
  updateSport,
  deleteSport
};