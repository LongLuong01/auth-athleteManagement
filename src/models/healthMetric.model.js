const pool = require("../config/db");

const HealthMetricModel = {
  async create(data) {
    const [result] = await pool.query(
      "INSERT INTO health_metric (name, description, normal_range, unit, metric_group_id) VALUES (?, ?, ?, ?, ?)",
      [data.name, data.description, data.normal_range, data.unit, data.metric_group_id]
    );
    return result.insertId;
  },

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM health_metric");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM health_metric WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, data) {
    const [result] = await pool.query(
      "UPDATE health_metric SET name = ?, description = ?, normal_range = ?, unit = ?, metric_group_id = ? WHERE id = ?",
      [data.name, data.description, data.normal_range, data.unit, data.metric_group_id, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM health_metric WHERE id = ?", [id]);
    return result.affectedRows;
  },

  async getByGroup(metric_group_id) {
    const [rows] = await pool.query(
      "SELECT * FROM health_metric WHERE metric_group_id = ?",
      [metric_group_id]
    );
    return rows;
  }
};

module.exports = HealthMetricModel;