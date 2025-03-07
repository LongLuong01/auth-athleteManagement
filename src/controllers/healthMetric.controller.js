const pool = require("../config/db");

// Thêm health metric mới
const createHealthMetric = async (req, res) => {
  const { name, description, normal_range, unit, metric_group_id } = req.body;

  if (!name || !unit || !metric_group_id) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO health_metric (name, description, normal_range, unit, metric_group_id) VALUES (?, ?, ?, ?, ?)",
      [name, description, normal_range, unit, metric_group_id]
    );
    res.status(201).json({ message: "Thêm health metric thành công!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm health metric!", error });
  }
};

// Lấy danh sách health metrics
const getHealthMetrics = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM health_metric");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách health metrics!", error });
  }
};

// Lấy health metric theo ID
const getHealthMetricById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM health_metric WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy health metric!" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy health metric!", error });
  }
};

// Cập nhật health metric
const updateHealthMetric = async (req, res) => {
  const { id } = req.params;
  const { name, description, normal_range, unit, metric_group_id } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE health_metric SET name = ?, description = ?, normal_range = ?, unit = ?, metric_group_id = ? WHERE id = ?",
      [name, description, normal_range, unit, metric_group_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy health metric!" });
    }

    res.status(200).json({ message: "Cập nhật health metric thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật health metric!", error });
  }
};

// Xóa health metric
const deleteHealthMetric = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM health_metric WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy health metric!" });
    }

    res.status(200).json({ message: "Xóa health metric thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa health metric!", error });
  }
};

module.exports = { createHealthMetric, getHealthMetrics, getHealthMetricById, updateHealthMetric, deleteHealthMetric };
