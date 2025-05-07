const express = require("express");
const router = express.Router();
const sportCategoryController = require("../controllers/sportCategory.controller");
const { validateSportCategory } = require("../middleware/validation.middleware");

router.get("/", sportCategoryController.getSportCategories);
router.get("/:id", sportCategoryController.getSportCategoryById);
router.post("/", validateSportCategory, sportCategoryController.createSportCategory);
router.put("/:id", validateSportCategory, sportCategoryController.updateSportCategory);
router.delete("/:id", sportCategoryController.deleteSportCategory);
router.get("/group/:group_sport_id", sportCategoryController.getSportCategoriesByGroup);

module.exports = router;