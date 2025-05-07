const express = require("express");
const router = express.Router();
const athleteSportController = require("../controllers/athleteSport.controller");
const { body, param } = require('express-validator');

// Validation middleware
const validateAthleteId = param('athleteId').isInt().withMessage('Athlete ID phải là số nguyên');
const validateSportId = param('sportId').isInt().withMessage('Sport ID phải là số nguyên');
const validateSportIds = body('sport_ids').isArray().withMessage('sport_ids phải là một mảng');

// Định nghĩa routes
router.get("/athletes/:athleteId/sports", validateAthleteId, athleteSportController.getAthleteSports);
router.get("/sports/:sportId/athletes", validateSportId, athleteSportController.getAthletesBySport);
router.post("/athletes/:athleteId/sports", [
  validateAthleteId,
  body('sport_id').isInt().withMessage('sport_id phải là số nguyên')
], athleteSportController.addSportToAthlete);
router.put("/athletes/:athleteId/sports", [
  validateAthleteId,
  validateSportIds
], athleteSportController.updateAthleteSports);
router.delete("/athletes/:athleteId/sports/:sportId", [
  validateAthleteId,
  validateSportId
], athleteSportController.removeSportFromAthlete);

module.exports = router;