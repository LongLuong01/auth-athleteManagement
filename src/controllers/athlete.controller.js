const pool = require("../config/db");

// them vdv moi
const createAthlete = async (req, res) => {
  const { fullname, date_of_birth, gender, phone, email, address, avatar } =
    req.body;

  if (!fullname || !date_of_birth || !gender) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  pool.query(
    "INSERT INTO athletes (fullname, date_of_birth, gender, phone, email, address, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [fullname, date_of_birth, gender, phone, email, address, avatar],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Lỗi khi thêm vận động viên!", error: err });
      }
      res.status(201).json({ message: "Thêm vận động viên thành công!" });
    }
  );
};

// lay danh sach vdv
const getAthletes = async (req, res) => {
  pool.query("SELECT * FROM athletes", (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi khi lấy danh sách vận động viên!", error: err });
    }
    res.status(200).json(result);
  });
};

// lay vdv theo id
const getAthleteById = async (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM athletes WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi khi lấy vận động viên!", error: err });
    }
    res.status(200).json(result[0]);
  });
};


// cap nhat vdv
const updateAthlete = async (req, res) => {
    const { id } = req.params;
    const { fullname, date_of_birth, gender, phone, email, address, avatar } = req.body;

    pool.query(
        "UPDATE athletes SET fullname = ?, date_of_birth =?, gender=?, phone=?, email=?, address=?, avatar=? WHERE id=?",
        [fullname, date_of_birth, gender, phone, email, address, avatar, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Lỗi khi cập nhật vận động viên!", error: err });
            }
            res.status(200).json({ message: "Cập nhật vận động viên thành công!" });
        }
    );
};

// xoa vdv
const deleteAthlete = async (req, res) => {
    const { id } = req.params;

    pool.query("DELETE FROM athletes WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi khi xóa vận động viên!", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy vận động viên!" });
        }
        res.status(200).json({ message: "Xóa vận động viên thành công!" });
    });
};


module.exports = { createAthlete, getAthletes, getAthleteById, updateAthlete, deleteAthlete };

