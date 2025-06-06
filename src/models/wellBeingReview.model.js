const db = require("../config/db");

const WellbeingReviewModel = {
  async create(data) {
    const sql = `INSERT INTO well_being_review 
      (athlete_id, training_date, muscle_soreness_point, sleep_hours, fatigue_level, sleeping_quality, 
      muscle_soreness, stress_level, mental_state) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      data.athlete_id,
      data.training_date,
      data.muscle_soreness_point,
      data.sleep_hours,
      data.fatigue_level,
      data.sleeping_quality,
      data.muscle_soreness,
      data.stress_level,
      data.mental_state,
    ];

    const [result] = await db.query(sql, values);
    return result.insertId;
  },

  async getAll() {
    const [rows] = await db.execute("SELECT * FROM well_being_review ORDER BY training_date DESC");
    return rows;
  },

  async getByAthleteId(athlete_id, limit, offset) {
    const sql = `SELECT * FROM well_being_review WHERE athlete_id = ? ORDER BY training_date DESC LIMIT ? OFFSET ?`;
    const [rows] = await db.query(sql, [athlete_id, limit, offset]);
    return rows;
  },

  async countByAthleteId(athlete_id) {
    const sql = `SELECT COUNT(*) AS total FROM well_being_review WHERE athlete_id = ?`;
    const [rows] = await db.query(sql, [athlete_id]);
    return rows[0].total;
  }
};

module.exports = WellbeingReviewModel;

