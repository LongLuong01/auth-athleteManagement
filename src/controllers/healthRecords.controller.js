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

// Lấy health records theo athlete_id, metric_id và khoảng thời gian
const getHealthRecordsByAthleteAndMetric = async (req, res) => {
  const { athlete_id, metric_id, fromDate, toDate } = req.params;
  

  console.log(`Received request - athlete_id: ${athlete_id}, metric_id: ${metric_id}, fromDate: ${fromDate}, toDate: ${toDate}`);

  if (!athlete_id || !metric_id || !fromDate || !toDate) {
    console.log("Missing required parameters");
    return res.status(400).json({ message: "athlete_id, metric_id, fromDate và toDate là bắt buộc!" });
  }

  try {
    const [records] = await pool.query(
      `SELECT * FROM health_record 
       WHERE athlete_id = ? AND metric_id = ? 
       AND DATE(recorded_at) BETWEEN ? AND ? 
       ORDER BY recorded_at ASC`,
      [athlete_id, metric_id, fromDate, toDate]
    );

    console.log("From Date:", fromDate, " / To Date: ", toDate);

    //ko tim thay
    if (records.length === 0) {
      console.log(`No health records found for athlete_id: ${athlete_id}, metric_id: ${metric_id}`);
      return res.status(404).json({ message: "Không tìm thấy health records!" });
    }

    res.status(200).json(records);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Lỗi khi lấy health records!", error });
  }
};

module.exports = { 
  createHealthRecord, 
  getHealthRecords, 
  getHealthRecordById, 
  updateHealthRecord, 
  deleteHealthRecord,
  getHealthRecordsByAthleteAndMetric 
};
