const SportCategoryModel = require("../models/sportCategory.model");

const SportCategoryService = {
  async createSportCategory(data) {
    return await SportCategoryModel.create(data);
  },
  async getSportCategories() {
    return await SportCategoryModel.getAll();
  },
  async getSportCategoryById(id) {
    return await SportCategoryModel.getById(id);
  },
  async updateSportCategory(id, data) {
    return await SportCategoryModel.update(id, data);
  },
  async deleteSportCategory(id) {
    return await SportCategoryModel.delete(id);
  },
  async getSportCategoriesByGroup(group_sport_id) {
    return await SportCategoryModel.getByGroupSportId(group_sport_id);
  }
};

module.exports = SportCategoryService;