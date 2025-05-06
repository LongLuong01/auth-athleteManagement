const pool = require("../config/db");

const MetricGroupModel = {
  async create(data) {
    const [result] = await pool.query(
      "INSERT INTO metric_group (name, description) VALUES (?, ?)",
      [data.name, data.description]
    );
    return { id: result.insertId, name: data.name, description: data.description };
  },

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM metric_group");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM metric_group WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, data) {
    const [result] = await pool.query(
      "UPDATE metric_group SET name = ?, description = ? WHERE id = ?",
      [data.name, data.description, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM metric_group WHERE id = ?", [id]);
    return result.affectedRows;
  }
};

module.exports = MetricGroupModel;