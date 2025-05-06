const pool = require("../config/db");

const HealthRecordsModel = {
  async create(data) {
    const [result] = await pool.query(
      "INSERT INTO health_record (athlete_id, metric_id, metric_value, recorded_at) VALUES (?, ?, ?, ?)",
      [data.athlete_id, data.metric_id, data.metric_value, data.recorded_at]
    );
    return result.insertId;
  },

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM health_record");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM health_record WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, data) {
    const [result] = await pool.query(
      "UPDATE health_record SET athlete_id = ?, metric_id = ?, metric_value = ? WHERE id = ?",
      [data.athlete_id, data.metric_id, data.metric_value, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM health_record WHERE id = ?", [id]);
    return result.affectedRows;
  },

  async getByAthleteAndMetric(athlete_id, metric_id, fromDate, toDate) {
    const [records] = await pool.query(
      `SELECT * FROM health_record 
       WHERE athlete_id = ? AND metric_id = ? 
       AND DATE(recorded_at) BETWEEN ? AND ? 
       ORDER BY recorded_at ASC`,
      [athlete_id, metric_id, fromDate, toDate]
    );
    return records;
  }
};

module.exports = HealthRecordsModel;