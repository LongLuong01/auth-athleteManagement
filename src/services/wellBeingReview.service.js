const WellbeingReviewModel = require("../models/wellBeingReview.model");

const WellbeingReviewService = {
  async createReview(data) {
    return await WellbeingReviewModel.create(data);
  },

  async getAllReviews() {
    return await WellbeingReviewModel.getAll();
  },

  async getReviewsByAthleteId(athlete_id, page = 1, limit = 30) {
    const offset = (page - 1) * limit;
    const reviews = await WellbeingReviewModel.getByAthleteId(athlete_id, limit, offset);
    const total = await WellbeingReviewModel.countByAthleteId(athlete_id);
    return { reviews, total };
  }
};

module.exports = WellbeingReviewService;