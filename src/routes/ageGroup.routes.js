const express = require("express");
const router = express.Router();
const ageGroupController = require("../controllers/ageGroup.controller");
const { validateAgeGroup } = require("../middleware/validation.middleware");

// Định nghĩa routes với validation
router.get("/", ageGroupController.getAgeGroups);
router.get("/:id", ageGroupController.getAgeGroupById);
router.post("/", validateAgeGroup, ageGroupController.createAgeGroup);
router.put("/:id", validateAgeGroup, ageGroupController.updateAgeGroup);
router.delete("/:id", ageGroupController.deleteAgeGroup);

module.exports = router;