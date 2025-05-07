const express = require("express");
const router = express.Router();
const athleteSportController = require("../controllers/athleteSport.controller");
const { validateAthleteSport } = require("../middleware/validation.middleware");

// Định nghĩa routes
router.get("/:athleteId/sports", athleteSportController.getAthleteSports);
router.get("/sports/:sportId/athletelist", athleteSportController.getAthletesBySport);
router.post("/:athleteId/sports", validateAthleteSport, athleteSportController.addSportsToAthlete);
router.put("/:athleteId/sports", validateAthleteSport, athleteSportController.updateAthleteSports);
router.delete("/:athleteId/sports/:sportId", athleteSportController.removeSportFromAthlete);

module.exports = router;