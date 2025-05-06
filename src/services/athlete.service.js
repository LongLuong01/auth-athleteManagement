const pool = require("../config/db");
const AthleteModel = require("../models/athlete.model");

const AthleteService = {
  async createAthlete(data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const athleteId = await AthleteModel.create(data, connection);

      if (data.age_group_id) {
        const ageGroupIds = Array.isArray(data.age_group_id) ? data.age_group_id : [data.age_group_id];
        await AthleteModel.addAgeGroups(athleteId, ageGroupIds, connection);
      }

      if (data.sport_id) {
        const sportIds = Array.isArray(data.sport_id) ? data.sport_id : [data.sport_id];
        await AthleteModel.addSports(athleteId, sportIds, connection);
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
    return await AthleteModel.update(id, data);
  },

  async deleteAthlete(id) {
    return await AthleteModel.delete(id);
  }
};

module.exports = AthleteService;