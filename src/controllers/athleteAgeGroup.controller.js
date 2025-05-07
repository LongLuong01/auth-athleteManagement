const AthleteAgeGroupService = require("../services/athleteAgeGroup.service");
const { logger } = require("../config/logger");

// Lấy danh sách nhóm tuổi của vận động viên
const getAthleteAgeGroups = async (req, res) => {
  try {
    const ageGroups = await AthleteAgeGroupService.getAthleteAgeGroups(req.params.athleteId);
    res.status(200).json(ageGroups);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách nhóm tuổi của vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhóm tuổi!" });
  }
};

// Thêm nhóm tuổi cho vận động viên
const addAgeGroupToAthlete = async (req, res) => {
  try {
    const result = await AthleteAgeGroupService.addAgeGroupToAthlete(
      req.params.athleteId,
      req.body.age_group_id
    );
    res.status(201).json({ message: "Thêm nhóm tuổi thành công!", id: result });
  } catch (error) {
    if (error.message === "Athlete not found" || error.message === "Age group not found") {
      return res.status(404).json({ message: error.message });
    }
    logger.error("Lỗi khi thêm nhóm tuổi cho vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi thêm nhóm tuổi!" });
  }
};

// Cập nhật toàn bộ nhóm tuổi của vận động viên
const updateAthleteAgeGroups = async (req, res) => {
  try {
    await AthleteAgeGroupService.updateAthleteAgeGroups(
      req.params.athleteId,
      req.body.age_group_ids
    );
    res.status(200).json({ message: "Cập nhật nhóm tuổi thành công!" });
  } catch (error) {
    if (error.message === "Athlete not found" || error.message.includes("Age group with id")) {
      return res.status(404).json({ message: error.message });
    }
    logger.error("Lỗi khi cập nhật nhóm tuổi của vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật nhóm tuổi!" });
  }
};

// Xóa nhóm tuổi của vận động viên
const removeAgeGroupFromAthlete = async (req, res) => {
  try {
    const result = await AthleteAgeGroupService.removeAgeGroupFromAthlete(
      req.params.athleteId,
      req.params.ageGroupId
    );
    if (result === 0) {
      return res.status(404).json({ message: "Không tìm thấy liên kết nhóm tuổi!" });
    }
    res.status(200).json({ message: "Xóa nhóm tuổi thành công!" });
  } catch (error) {
    if (error.message === "Athlete not found" || error.message === "Age group not found") {
      return res.status(404).json({ message: error.message });
    }
    logger.error("Lỗi khi xóa nhóm tuổi của vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi xóa nhóm tuổi!" });
  }
};

module.exports = {
  getAthleteAgeGroups,
  addAgeGroupToAthlete,
  updateAthleteAgeGroups,
  removeAgeGroupFromAthlete
};