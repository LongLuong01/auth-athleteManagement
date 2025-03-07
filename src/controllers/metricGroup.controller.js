const pool = require("../config/db");

// Thêm nhóm chỉ số sức khỏe mới
const createMetricGroup = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Tên nhóm chỉ số là bắt buộc!" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO metric_group (name, description) VALUES (?, ?)",
      [name, description]
    );
    res.status(201).json({ id: result.insertId, name, description });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm nhóm chỉ số!", error: err });
  }
};

// Lấy danh sách nhóm chỉ số sức khỏe
const getMetricGroups = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM metric_group");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhóm chỉ số!", error: err });
  }
};

// Lấy nhóm chỉ số theo ID
const getMetricGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM metric_group WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Nhóm chỉ số không tồn tại!" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy nhóm chỉ số!", error: err });
  }
};

// Cập nhật nhóm chỉ số
const updateMetricGroup = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE metric_group SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nhóm chỉ số không tồn tại!" });
    }

    res.status(200).json({ message: "Cập nhật nhóm chỉ số thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật nhóm chỉ số!", error: err });
  }
};

// Xóa nhóm chỉ số
const deleteMetricGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM metric_group WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nhóm chỉ số không tồn tại!" });
    }

    res.status(200).json({ message: "Xóa nhóm chỉ số thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa nhóm chỉ số!", error: err });
  }
};

module.exports = {
  createMetricGroup,
  getMetricGroups,
  getMetricGroupById,
  updateMetricGroup,
  deleteMetricGroup,
};
