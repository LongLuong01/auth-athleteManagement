const MetricGroupModel = require("../models/metricGroup.model");

const MetricGroupService = {
  async createMetricGroup(data) {
    return await MetricGroupModel.create(data);
  },

  async getMetricGroups() {
    return await MetricGroupModel.getAll();
  },

  async getMetricGroupById(id) {
    return await MetricGroupModel.getById(id);
  },

  async updateMetricGroup(id, data) {
    return await MetricGroupModel.update(id, data);
  },

  async deleteMetricGroup(id) {
    return await MetricGroupModel.delete(id);
  }
};

module.exports = MetricGroupService;