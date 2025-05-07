const { logger } = require("../config/logger");
const AthleteService = require("../services/athlete.service");

// Thêm vận động viên mới
const createAthlete = async (req, res) => {
  try {
    const athleteId = await AthleteService.createAthlete(req.body);
    res.status(201).json({ message: "Thêm vận động viên thành công!", id: athleteId });
  } catch (error) {
    logger.error("Lỗi khi thêm vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi thêm vận động viên!" });
  }
};

// Lấy danh sách vận động viên
const getAthletes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  try {
    const result = await AthleteService.getAthletes(page, limit);
    res.status(200).json(result);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách vận động viên!" });
  }
};

// Lấy vận động viên theo ID
const getAthleteById = async (req, res) => {
  try {
    const athlete = await AthleteService.getAthleteById(req.params.id);
    if (!athlete) {
      return res.status(404).json({ message: "Không tìm thấy vận động viên!" });
    }
    res.status(200).json(athlete);
  } catch (error) {
    logger.error("Lỗi khi lấy vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy vận động viên!" });
  }
};

// Cập nhật vận động viên
const updateAthlete = async (req, res) => {
  try {
    const affectedRows = await AthleteService.updateAthlete(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy vận động viên!" });
    }
    res.status(200).json({ message: "Cập nhật vận động viên thành công!" });
  } catch (error) {
    logger.error("Lỗi khi cập nhật vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật vận động viên!" });
  }
};

// Xóa vận động viên
const deleteAthlete = async (req, res) => {
  try {
    const affectedRows = await AthleteService.deleteAthlete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy vận động viên!" });
    }
    res.status(200).json({ message: "Xóa vận động viên thành công!" });
  } catch (error) {
    logger.error("Lỗi khi xóa vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi xóa vận động viên!" });
  }
};

// Lấy tất cả vận động viên không phân trang
const getAllAthletes = async (req, res) => {
  try {
    const athletes = await AthleteService.getAllAthletes();
    res.status(200).json(athletes);
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách tất cả vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách vận động viên!" });
  }
};

module.exports = { createAthlete, getAthletes, getAthleteById, updateAthlete, deleteAthlete, getAllAthletes };