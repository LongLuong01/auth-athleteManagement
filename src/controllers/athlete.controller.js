const pool = require("../config/db");

// Thêm vận động viên mới
const createAthlete = async (req, res) => {
  const { fullname, date_of_birth, gender, phone, email, address, avatar, password } = req.body;

  if (!fullname || !date_of_birth || !gender) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO athlete (fullname, date_of_birth, gender, phone, email, address, avatar, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [fullname, date_of_birth, gender, phone, email, address, avatar, password]
    );
    res.status(201).json({ message: "Thêm vận động viên thành công!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm vận động viên!", error });
  }
};

// Lấy danh sách vận động viên
const getAthletes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM athlete");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách vận động viên!", error });
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
    res.status(500).json({ message: "Lỗi khi lấy vận động viên!", error });
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
    res.status(500).json({ message: "Lỗi khi cập nhật vận động viên!", error });
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
    res.status(500).json({ message: "Lỗi khi xóa vận động viên!", error });
  }
};

module.exports = { createAthlete, getAthletes, getAthleteById, updateAthlete, deleteAthlete };
