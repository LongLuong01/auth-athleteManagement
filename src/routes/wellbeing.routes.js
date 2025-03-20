const express = require('express');
const { createReview, getReviews, getReviewsByAthleteId } = require('../controllers/wellbeing.controller');

const router = express.Router();

router.post('/', createReview);
router.get('/', getReviews);
router.get('/athlete', getReviewsByAthleteId);

module.exports = router;

