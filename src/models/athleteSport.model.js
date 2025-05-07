const pool = require("../config/db");

const AthleteSpotModel = {
  async getByAthleteId(athleteId) {
    const [rows] = await pool.query(
      `SELECT ats.*, s.name as sport_name, s.description 
       FROM athlete_sport ats
       JOIN sport s ON ats.sport_id = s.id
       WHERE ats.athlete_id = ? AND ats.active = true`,
      [athleteId]
    );
    return rows;
  },

  async getBySportId(sportId) {
    const [rows] = await pool.query(
      `SELECT a.*, ats.created_at as joined_at 
       FROM athlete_sport ats
       JOIN athlete a ON ats.athlete_id = a.id
       WHERE ats.sport_id = ? AND ats.active = true`,
      [sportId]
    );
    return rows;
  },

  async addSports(athleteId, sportIds) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      const results = [];
      // Thêm từng môn thể thao
      for (const sportId of sportIds) {
        const [result] = await connection.query(
          "INSERT INTO athlete_sport (athlete_id, sport_id, active) VALUES (?, ?, true)",
          [athleteId, sportId]
        );
        results.push({
          sport_id: sportId,
          active: true
        });
      }

      await connection.commit();
      return {
        athlete_id: athleteId,
        sports: results
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async updateSports(athleteId, sportIds) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      // Deactivate all existing sports
      await connection.query(
        "UPDATE athlete_sport SET active = false WHERE athlete_id = ?",
        [athleteId]
      );

      // Add or reactivate new sports
      for (const sportId of sportIds) {
        const [existing] = await connection.query(
          "SELECT id FROM athlete_sport WHERE athlete_id = ? AND sport_id = ?",
          [athleteId, sportId]
        );

        if (existing.length > 0) {
          await connection.query(
            "UPDATE athlete_sport SET active = true WHERE athlete_id = ? AND sport_id = ?",
            [athleteId, sportId]
          );
        } else {
          await connection.query(
            "INSERT INTO athlete_sport (athlete_id, sport_id, active) VALUES (?, ?, true)",
            [athleteId, sportId]
          );
        }
      }

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async removeSport(athleteId, sportId) {
    const [result] = await pool.query(
      "DELETE FROM athlete_sport WHERE athlete_id = ? AND sport_id = ?",
      [athleteId, sportId]
    );
    return result.affectedRows;
  },

  async checkAthleteExists(athleteId) {
    const [rows] = await pool.query("SELECT id FROM athlete WHERE id = ?", [athleteId]);
    return rows.length > 0;
  },

  async checkSportExists(sportId) {
    const [rows] = await pool.query("SELECT id FROM sport WHERE id = ?", [sportId]);
    return rows.length > 0;
  }
};

module.exports = AthleteSpotModel;