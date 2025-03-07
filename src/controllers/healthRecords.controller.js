const pool = require("../config/db");

// Thêm health record mới
const createHealthRecord = async (req, res) => {
  const { athlete_id, metric_id, metric_value } = req.body;

  if (!athlete_id || !metric_id || metric_value === undefined) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO health_record (athlete_id, metric_id, metric_value) VALUES (?, ?, ?)",
      [athlete_id, metric_id, metric_value]
    );
    res.status(201).json({ message: "Thêm health record thành công!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm health record!", error });
  }
};

// Lấy danh sách health records
const getHealthRecords = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM health_record");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách health records!", error });
  }
};

// Lấy health record theo ID
const getHealthRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM health_record WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy health record!" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy health record!", error });
  }
};

// Cập nhật health record
const updateHealthRecord = async (req, res) => {
  const { id } = req.params;
  const { athlete_id, metric_id, metric_value } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE health_record SET athlete_id = ?, metric_id = ?, metric_value = ? WHERE id = ?",
      [athlete_id, metric_id, metric_value, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy health record!" });
    }

    res.status(200).json({ message: "Cập nhật health record thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật health record!", error });
  }
};

// Xóa health record
const deleteHealthRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM health_record WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy health record!" });
    }

    res.status(200).json({ message: "Xóa health record thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa health record!", error });
  }
};

module.exports = { createHealthRecord, getHealthRecords, getHealthRecordById, updateHealthRecord, deleteHealthRecord };
