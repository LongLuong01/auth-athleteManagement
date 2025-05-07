const express = require("express");
const router = express.Router();
const sportController = require("../controllers/sport.controller");
const { validateSport } = require("../middleware/validation.middleware");

router.get("/", sportController.getSports);
router.get("/:id", sportController.getSportById);
router.post("/", validateSport, sportController.createSport);
router.put("/:id", validateSport, sportController.updateSport);
router.delete("/:id", sportController.deleteSport);

module.exports = router;