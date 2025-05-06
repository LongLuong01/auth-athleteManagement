const pool = require("../config/db");

const AthleteModel = {
  async create(data, connection) {
    const [result] = await connection.query(
      "INSERT INTO athlete (fullname, date_of_birth, gender, phone, email, address, avatar, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [data.fullname, data.date_of_birth, data.gender, data.phone, data.email, data.address, data.avatar, data.password]
    );
    return result.insertId;
  },

  async addAgeGroups(athleteId, ageGroupIds, connection) {
    for (const agId of ageGroupIds) {
      await connection.query(
        "INSERT INTO athlete_age_group (athlete_id, age_group_id) VALUES (?, ?)",
        [athleteId, agId]
      );
    }
  },

  async addSports(athleteId, sportIds, connection) {
    for (const sId of sportIds) {
      await connection.query(
        "INSERT INTO athlete_sport (athlete_id, sport_id) VALUES (?, ?)",
        [athleteId, sId]
      );
    }
  },

  async getAll(limit, offset) {
    const [rows] = await pool.query("SELECT * FROM athlete LIMIT ? OFFSET ?", [limit, offset]);
    return rows;
  },

  async countAll() {
    const [[{ total }]] = await pool.query("SELECT COUNT(*) as total FROM athlete");
    return total;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM athlete WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, data) {
    const [result] = await pool.query(
      "UPDATE athlete SET fullname = ?, date_of_birth = ?, gender = ?, phone = ?, email = ?, address = ?, avatar = ?, password = ? WHERE id = ?",
      [data.fullname, data.date_of_birth, data.gender, data.phone, data.email, data.address, data.avatar, data.password, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM athlete WHERE id = ?", [id]);
    return result.affectedRows;
  }
};

module.exports = AthleteModel;