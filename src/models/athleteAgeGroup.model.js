const pool = require("../config/db");

const AthleteAgeGroupModel = {
  async getByAthleteId(athleteId) {
    const [rows] = await pool.query(
      `SELECT aag.*, ag.name as age_group_name, ag.description 
       FROM athlete_age_group aag
       JOIN age_group ag ON aag.age_group_id = ag.id
       WHERE aag.athlete_id = ?`,
      [athleteId]
    );
    return rows;
  },

  async addAgeGroup(athleteId, ageGroupId, active = true) {
    const [result] = await pool.query(
      "INSERT INTO athlete_age_group (athlete_id, age_group_id, active) VALUES (?, ?, ?)",
      [athleteId, ageGroupId, active]
    );
    return result.insertId;
  },

  async updateAgeGroups(athleteId, ageGroupIds) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      // Deactivate all existing age groups
      await connection.query(
        "UPDATE athlete_age_group SET active = false WHERE athlete_id = ?",
        [athleteId]
      );

      // Add or reactivate new age groups
      for (const ageGroupId of ageGroupIds) {
        const [existing] = await connection.query(
          "SELECT id FROM athlete_age_group WHERE athlete_id = ? AND age_group_id = ?",
          [athleteId, ageGroupId]
        );

        if (existing.length > 0) {
          await connection.query(
            "UPDATE athlete_age_group SET active = true WHERE athlete_id = ? AND age_group_id = ?",
            [athleteId, ageGroupId]
          );
        } else {
          await connection.query(
            "INSERT INTO athlete_age_group (athlete_id, age_group_id, active) VALUES (?, ?, true)",
            [athleteId, ageGroupId]
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

  async removeAgeGroup(athleteId, ageGroupId) {
    const [result] = await pool.query(
      "DELETE FROM athlete_age_group WHERE athlete_id = ? AND age_group_id = ?",
      [athleteId, ageGroupId]
    );
    return result.affectedRows;
  },

  async checkAthleteExists(athleteId) {
    const [rows] = await pool.query("SELECT id FROM athlete WHERE id = ?", [athleteId]);
    return rows.length > 0;
  },

  async checkAgeGroupExists(ageGroupId) {
    const [rows] = await pool.query("SELECT id FROM age_group WHERE id = ?", [ageGroupId]);
    return rows.length > 0;
  },

  async addAgeGroups(athleteId, ageGroupIds) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      const results = [];
      // Thêm từng nhóm tuổi
      for (const ageGroupId of ageGroupIds) {
        const [result] = await connection.query(
          "INSERT INTO athlete_age_group (athlete_id, age_group_id, active) VALUES (?, ?, true)",
          [athleteId, ageGroupId]
        );
        results.push({
          age_group_id: ageGroupId,
          active: true
        });
      }

      await connection.commit();
      return {
        athlete_id: athleteId,
        age_groups: results
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = AthleteAgeGroupModel;