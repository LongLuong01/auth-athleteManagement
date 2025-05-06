const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const { logger } = require("../config/logger");

// Thêm vận động viên mới
const createAthlete = async (req, res) => {
  const { fullname, date_of_birth, gender, phone, email, address, avatar, password, age_group_id, sport_id } = req.body;

  if (!fullname || !date_of_birth || !gender) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Thêm vận động viên
    const [result] = await connection.query(
      "INSERT INTO athlete (fullname, date_of_birth, gender, phone, email, address, avatar, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [fullname, date_of_birth, gender, phone, email, address, avatar, password]
    );
    const athleteId = result.insertId;

    // Thêm vào athlete_age_group nếu có
    if (age_group_id) {
      const ageGroupIds = Array.isArray(age_group_id) ? age_group_id : [age_group_id];
      for (const agId of ageGroupIds) {
        await connection.query(
          "INSERT INTO athlete_age_group (athlete_id, age_group_id) VALUES (?, ?)",
          [athleteId, agId]
        );
      }
    }

    // Thêm vào athlete_sport nếu có
    if (sport_id) {
      const sportIds = Array.isArray(sport_id) ? sport_id : [sport_id];
      for (const sId of sportIds) {
        await connection.query(
          "INSERT INTO athlete_sport (athlete_id, sport_id) VALUES (?, ?)",
          [athleteId, sId]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ message: "Thêm vận động viên thành công!", id: athleteId });
  } catch (error) {
    await connection.rollback();
    logger.error("Lỗi khi thêm vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi thêm vận động viên!" });
  } finally {
    connection.release();
  }
};

// Lấy danh sách vận động viên
const getAthletes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await pool.query("SELECT * FROM athlete LIMIT ? OFFSET ?", [limit, offset]);
    // Đếm tổng số bản ghi (nếu muốn trả về tổng số trang)
    const [[{ total }]] = await pool.query("SELECT COUNT(*) as total FROM athlete");
    res.status(200).json({ data: rows, total, page, limit });
  } catch (error) {
    logger.error("Lỗi khi lấy danh sách vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách vận động viên!" });
  }
};

// Lấy vận động viên theo ID
const getAthleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM athlete WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy vận động viên!" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    logger.error("Lỗi khi lấy vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy vận động viên!" });
  }
};

// Cập nhật vận động viên
const updateAthlete = async (req, res) => {
  const { id } = req.params;
  const { fullname, date_of_birth, gender, phone, email, address, avatar, password } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE athlete SET fullname = ?, date_of_birth = ?, gender = ?, phone = ?, email = ?, address = ?, avatar = ?, password = ? WHERE id = ?",
      [fullname, date_of_birth, gender, phone, email, address, avatar, password, id]
    );

    if (result.affectedRows === 0) {
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
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM athlete WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy vận động viên!" });
    }

    res.status(200).json({ message: "Xóa vận động viên thành công!" });
  } catch (error) {
    logger.error("Lỗi khi xóa vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi xóa vận động viên!" });
  }
};

module.exports = { createAthlete, getAthletes, getAthleteById, updateAthlete, deleteAthlete };
