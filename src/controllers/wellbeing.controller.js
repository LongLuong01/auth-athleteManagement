const WellbeingReview = require("../models/wellBeingReview.model");

exports.createReview = async (req, res) => {
  try {
    const newReview = await WellbeingReview.create(req.body);
    res.status(201).json({ message: "Review added successfully", newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await WellbeingReview.getAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByAthleteId = async (req, res) => { 
  try {
    const athlete_id = req.query.athlete_id;
    let reviews;

    if (athlete_id) {
      reviews = await WellbeingReview.getByAthleteId(athlete_id);
    } 
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

