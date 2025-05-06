const WellbeingReview = require("../models/wellBeingReview.model");
const { logger } = require("../config/logger");

exports.createReview = async (req, res) => {
  try {
    const newReview = await WellbeingReview.create(req.body);
    res.status(201).json({ message: "Review added successfully", newReview });
  } catch (error) {
    logger.error("Lỗi khi thêm wellbeing review:", error);
    res.status(500).json({ message: "Lỗi khi thêm wellbeing review!" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await WellbeingReview.getAll();
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

    const offset = (page - 1) * limit;
    const reviews = await WellbeingReview.getByAthleteId(athlete_id, parseInt(limit), parseInt(offset));

    // Đếm tổng số review
    const total = await WellbeingReview.countByAthleteId(athlete_id);
    
    res.json({ reviews, total });
  } catch (error) {
    logger.error("Lỗi khi lấy wellbeing review theo athlete_id:", error);
    res.status(500).json({ message: "Lỗi khi lấy wellbeing review!" });
  }
}

