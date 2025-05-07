const pool = require("../config/db");

const SportModel = {
  async create(data) {
    const [result] = await pool.query(
      "INSERT INTO sport (name, description) VALUES (?, ?)",
      [data.name, data.description]
    );
    return { id: result.insertId, ...data };
  },

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM sport");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM sport WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, data) {
    const [result] = await pool.query(
      "UPDATE sport SET name = ?, description = ? WHERE id = ?",
      [data.name, data.description, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM sport WHERE id = ?", [id]);
    return result.affectedRows;
  }
};

module.exports = SportModel;