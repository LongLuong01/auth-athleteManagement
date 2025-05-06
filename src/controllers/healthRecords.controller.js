const HealthRecordsService = require("../services/healthRecords.service");
const { logger } = require("../config/logger");

// Thêm health record mới
const createHealthRecord = async (req, res) => {
  try {
    const id = await HealthRecordsService.createHealthRecord(req.body);
    res.status(201).json({ message: "Thêm health record thành công!", id });
  } catch (error) {
    logger.error("Lỗi khi thêm health record:", error);
    res.status(500).json({ message: "Lỗi khi thêm health record!" });
  }
};

// Lấy danh sách health records
const getHealthRecords = async (req, res) => {
  try {
    const rows = await HealthRecordsService.getHealthRecords();
    res.status(200).json(rows);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách health records:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách health records!" });
  }
};

// Lấy health record theo ID
const getHealthRecordById = async (req, res) => {
  try {
    const row = await HealthRecordsService.getHealthRecordById(req.params.id);
    if (!row) {
      return res.status(404).json({ message: "Không tìm thấy health record!" });
    }
    res.status(200).json(row);
  } catch (error) {
    logger.error("Lỗi khi lấy health record:", error);
    res.status(500).json({ message: "Lỗi khi lấy health record!" });
  }
};

// Cập nhật health record
const updateHealthRecord = async (req, res) => {
  try {
    const affectedRows = await HealthRecordsService.updateHealthRecord(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy health record!" });
    }
    res.status(200).json({ message: "Cập nhật health record thành công!" });
  } catch (error) {
    logger.error("Lỗi khi cập nhật health record:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật health record!" });
  }
};

// Xóa health record
const deleteHealthRecord = async (req, res) => {
  try {
    const affectedRows = await HealthRecordsService.deleteHealthRecord(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy health record!" });
    }
    res.status(200).json({ message: "Xóa health record thành công!" });
  } catch (error) {
    logger.error("Lỗi khi xóa health record:", error);
    res.status(500).json({ message: "Lỗi khi xóa health record!" });
  }
};

// Lấy health records theo athlete_id, metric_id và khoảng thời gian
const getHealthRecordsByAthleteAndMetric = async (req, res) => {
  const { athlete_id, metric_id, fromDate, toDate } = req.params;
  if (!athlete_id || !metric_id || !fromDate || !toDate) {
    return res.status(400).json({ message: "athlete_id, metric_id, fromDate và toDate là bắt buộc!" });
  }
  try {
    const records = await HealthRecordsService.getHealthRecordsByAthleteAndMetric(athlete_id, metric_id, fromDate, toDate);
    if (!records || records.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy health records!" });
    }
    res.status(200).json(records);
  } catch (error) {
    logger.error("Lỗi khi lấy health records theo filter:", error);
    res.status(500).json({ message: "Lỗi khi lấy health records!" });
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