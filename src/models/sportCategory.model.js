const pool = require("../config/db");

const SportCategoryModel = {
  async create(data) {
    const [result] = await pool.query(
      "INSERT INTO sport_category (group_sport_id, sport_id) VALUES (?, ?)",
      [data.group_sport_id, data.sport_id]
    );
    return { id: result.insertId, ...data };
  },

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM sport_category");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM sport_category WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, data) {
    const [result] = await pool.query(
      "UPDATE sport_category SET group_sport_id = ?, sport_id = ? WHERE id = ?",
      [data.group_sport_id, data.sport_id, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM sport_category WHERE id = ?", [id]);
    return result.affectedRows;
  },

  async getByGroupSportId(group_sport_id) {
    const [rows] = await pool.query(
      "SELECT * FROM sport_category WHERE group_sport_id = ?",
      [group_sport_id]
    );
    return rows;
  }
};

module.exports = SportCategoryModel;