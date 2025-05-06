const WellbeingReviewService = require("../services/wellBeingReview.service");
const { logger } = require("../config/logger");

exports.createReview = async (req, res) => {
  try {
    const reviewId = await WellbeingReviewService.createReview(req.body);
    res.status(201).json({ message: "Review added successfully", id: reviewId });
  } catch (error) {
    logger.error("Lỗi khi thêm wellbeing review:", error);
    res.status(500).json({ message: "Lỗi khi thêm wellbeing review!" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await WellbeingReviewService.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách wellbeing review:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách wellbeing review!" });
  }
};

exports.getReviewsByAthleteId = async (req, res) => { 
  try {
    const { athlete_id, page = 1, limit = 30 } = req.query;
    if (!athlete_id) {
      return res.status(400).json({ message: "Thiếu athlete_id" });
    }
    const result = await WellbeingReviewService.getReviewsByAthleteId(athlete_id, parseInt(page), parseInt(limit));
    res.json(result);
  } catch (error) {
    logger.error("Lỗi khi lấy wellbeing review theo athlete_id:", error);
    res.status(500).json({ message: "Lỗi khi lấy wellbeing review!" });
  }
};