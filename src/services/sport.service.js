const SportModel = require("../models/sport.model");

const SportService = {
  async createSport(data) {
    return await SportModel.create(data);
  },
  async getSports() {
    return await SportModel.getAll();
  },
  async getSportById(id) {
    return await SportModel.getById(id);
  },
  async updateSport(id, data) {
    return await SportModel.update(id, data);
  },
  async deleteSport(id) {
    return await SportModel.delete(id);
  }
};

module.exports = SportService;