const pool = require("../config/db");
const AthleteModel = require("../models/athlete.model");

const AthleteService = {
  async createAthlete(data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      // Kiểm tra email tồn tại
      const [existingAthletes] = await connection.query(
        "SELECT id FROM athlete WHERE email = ?",
        [data.email]
      );
      
      if (existingAthletes.length > 0) {
        throw new Error("Email đã được sử dụng!");
      }

      const athleteId = await AthleteModel.create(data, connection);

      if (data.age_group_ids) {
        await AthleteModel.addAgeGroups(athleteId, data.age_group_ids, connection);
      }

      if (data.sport_ids) {
        await AthleteModel.addSports(athleteId, data.sport_ids, connection);
      }

      await connection.commit();
      return athleteId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async getAthletes(page, limit) {
    const offset = (page - 1) * limit;
    const data = await AthleteModel.getAll(limit, offset);
    const total = await AthleteModel.countAll();
    return { data, total, page, limit };
  },

  async getAthleteById(id) {
    return await AthleteModel.getById(id);
  },

  async updateAthlete(id, data) {
    // Kiểm tra email tồn tại (nếu có thay đổi email)
    if (data.email) {
      const [existingAthletes] = await pool.query(
        "SELECT id FROM athlete WHERE email = ? AND id != ?",
        [data.email, id]
      );
      
      if (existingAthletes.length > 0) {
        throw new Error("Email đã được sử dụng!");
      }
    }

    return await AthleteModel.update(id, data);
  },

  async deleteAthlete(id) {
    return await AthleteModel.delete(id);
  }
};

module.exports = AthleteService;