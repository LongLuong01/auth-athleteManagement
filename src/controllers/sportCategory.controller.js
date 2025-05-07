const SportCategoryService = require("../services/sportCategory.service");
const { validationResult } = require("express-validator");

const createSportCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const result = await SportCategoryService.createSportCategory(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sport category!" });
  }
};

const getSportCategories = async (req, res) => {
  try {
    const rows = await SportCategoryService.getSportCategories();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sport category!" });
  }
};

const getSportCategoryById = async (req, res) => {
  try {
    const row = await SportCategoryService.getSportCategoryById(req.params.id);
    if (!row) return res.status(404).json({ message: "Sport category không tồn tại!" });
    res.status(200).json(row);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sport category!" });
  }
};

const updateSportCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const affectedRows = await SportCategoryService.updateSportCategory(req.params.id, req.body);
    if (affectedRows === 0) return res.status(404).json({ message: "Sport category không tồn tại!" });
    res.status(200).json({ message: "Cập nhật sport category thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sport category!" });
  }
};

const deleteSportCategory = async (req, res) => {
  try {
    const affectedRows = await SportCategoryService.deleteSportCategory(req.params.id);
    if (affectedRows === 0) return res.status(404).json({ message: "Sport category không tồn tại!" });
    res.status(200).json({ message: "Xóa sport category thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sport category!" });
  }
};

const getSportCategoriesByGroup = async (req, res) => {
  try {
    const rows = await SportCategoryService.getSportCategoriesByGroup(req.params.group_sport_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sport category theo group_sport_id!" });
  }
};

module.exports = {
  createSportCategory,
  getSportCategories,
  getSportCategoryById,
  updateSportCategory,
  deleteSportCategory,
  getSportCategoriesByGroup
};