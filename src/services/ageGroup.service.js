const AgeGroupModel = require("../models/ageGroup.model");

const AgeGroupService = {
  async createAgeGroup(data) {
    return await AgeGroupModel.create(data);
  },

  async getAgeGroups() {
    return await AgeGroupModel.getAll();
  },

  async getAgeGroupById(id) {
    return await AgeGroupModel.getById(id);
  },

  async updateAgeGroup(id, data) {
    return await AgeGroupModel.update(id, data);
  },

  async deleteAgeGroup(id) {
    return await AgeGroupModel.delete(id);
  }
};

module.exports = AgeGroupService;