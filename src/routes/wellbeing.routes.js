const express = require('express');
const { createReview, getReviews } = require('../controllers/wellbeing.controller');

const router = express.Router();

router.post('/', createReview);
router.get('/', getReviews);

module.exports = router;

