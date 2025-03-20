const db = require("../config/db");

class WellbeingReview {
    static async create(data) {
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
      return values;
    }
  
    static async getAll() {
      const [rows] = await db.execute("SELECT * FROM well_being_review ORDER BY created_at DESC");
      return rows;
    }
  }
  
  module.exports = WellbeingReview;

