const HealthRecordsModel = require("../models/healthRecords.model");

const HealthRecordsService = {
  async createHealthRecord(data) {
    return await HealthRecordsModel.create(data);
  },

  async getHealthRecords() {
    return await HealthRecordsModel.getAll();
  },

  async getHealthRecordById(id) {
    return await HealthRecordsModel.getById(id);
  },

  async updateHealthRecord(id, data) {
    return await HealthRecordsModel.update(id, data);
  },

  async deleteHealthRecord(id) {
    return await HealthRecordsModel.delete(id);
  },

  async getHealthRecordsByAthleteAndMetric(athlete_id, metric_id, fromDate, toDate) {
    return await HealthRecordsModel.getByAthleteAndMetric(athlete_id, metric_id, fromDate, toDate);
  }
};

module.exports = HealthRecordsService;