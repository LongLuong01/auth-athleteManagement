const AthleteSpotService = require("../services/athleteSport.service");
const { logger } = require("../config/logger");

// Lấy danh sách môn thể thao của vận động viên
const getAthleteSports = async (req, res) => {
  try {
    const sports = await AthleteSpotService.getAthleteSports(req.params.athleteId);
    res.status(200).json(sports);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách môn thể thao của vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách môn thể thao!" });
  }
};

// Lấy danh sách vận động viên theo môn thể thao
const getAthletesBySport = async (req, res) => {
  try {
    const athletes = await AthleteSpotService.getAthletesBySport(req.params.sportId);
    res.status(200).json(athletes);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách vận động viên theo môn thể thao:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách vận động viên!" });
  }
};

// Thêm môn thể thao cho vận động viên
const addSportToAthlete = async (req, res) => {
  try {
    const result = await AthleteSpotService.addSportToAthlete(
      req.params.athleteId,
      req.body.sport_id
    );
    res.status(201).json({ message: "Thêm môn thể thao thành công!", id: result });
  } catch (error) {
    if (error.message === "Athlete not found" || error.message === "Sport not found") {
      return res.status(404).json({ message: error.message });
    }
    logger.error("Lỗi khi thêm môn thể thao cho vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi thêm môn thể thao!" });
  }
};

// Cập nhật toàn bộ môn thể thao của vận động viên
const updateAthleteSports = async (req, res) => {
  try {
    await AthleteSpotService.updateAthleteSports(
      req.params.athleteId,
      req.body.sport_ids
    );
    res.status(200).json({ message: "Cập nhật môn thể thao thành công!" });
  } catch (error) {
    if (error.message === "Athlete not found" || error.message.includes("Sport with id")) {
      return res.status(404).json({ message: error.message });
    }
    logger.error("Lỗi khi cập nhật môn thể thao của vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật môn thể thao!" });
  }
};

// Xóa môn thể thao của vận động viên
const removeSportFromAthlete = async (req, res) => {
  try {
    const result = await AthleteSpotService.removeSportFromAthlete(
      req.params.athleteId,
      req.params.sportId
    );
    if (result === 0) {
      return res.status(404).json({ message: "Không tìm thấy liên kết môn thể thao!" });
    }
    res.status(200).json({ message: "Xóa môn thể thao thành công!" });
  } catch (error) {
    if (error.message === "Athlete not found" || error.message === "Sport not found") {
      return res.status(404).json({ message: error.message });
    }
    logger.error("Lỗi khi xóa môn thể thao của vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi xóa môn thể thao!" });
  }
};

module.exports = {
  getAthleteSports,
  getAthletesBySport,
  addSportToAthlete,
  updateAthleteSports,
  removeSportFromAthlete
};