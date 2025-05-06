const HealthMetricModel = require("../models/healthMetric.model");

const HealthMetricService = {
  async createHealthMetric(data) {
    return await HealthMetricModel.create(data);
  },

  async getHealthMetrics() {
    return await HealthMetricModel.getAll();
  },

  async getHealthMetricById(id) {
    return await HealthMetricModel.getById(id);
  },

  async updateHealthMetric(id, data) {
    return await HealthMetricModel.update(id, data);
  },

  async deleteHealthMetric(id) {
    return await HealthMetricModel.delete(id);
  },

  async getHealthMetricsByGroup(metric_group_id) {
    return await HealthMetricModel.getByGroup(metric_group_id);
  }
};

module.exports = HealthMetricService;