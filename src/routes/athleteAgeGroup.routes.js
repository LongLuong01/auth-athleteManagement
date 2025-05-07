const express = require("express");
const router = express.Router();
const athleteAgeGroupController = require("../controllers/athleteAgeGroup.controller");
const { body, param } = require('express-validator');

// Validation middleware
const validateAthleteId = param('athleteId').isInt().withMessage('Athlete ID phải là số nguyên');
const validateAgeGroupId = param('ageGroupId').isInt().withMessage('Age Group ID phải là số nguyên');
const validateAgeGroupIds = body('age_group_ids').isArray().withMessage('age_group_ids phải là một mảng');

// Định nghĩa routes
router.get("/:athleteId/age-groups", validateAthleteId, athleteAgeGroupController.getAthleteAgeGroups);
router.post("/:athleteId/age-groups", [
  validateAthleteId,
  body('age_group_id').isInt().withMessage('age_group_id phải là số nguyên')
], athleteAgeGroupController.addAgeGroupToAthlete);
router.put("/:athleteId/age-groups", [
  validateAthleteId,
  validateAgeGroupIds
], athleteAgeGroupController.updateAthleteAgeGroups);
router.delete("/:athleteId/age-groups/:ageGroupId", [
  validateAthleteId,
  validateAgeGroupId
], athleteAgeGroupController.removeAgeGroupFromAthlete);

module.exports = router;