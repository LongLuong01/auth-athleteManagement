const pool = require("../config/db");
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;  // Độ phức tạp của mã hóa

const AthleteModel = {
  async create(data, connection) {
    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const [result] = await connection.query(
      "INSERT INTO athlete (fullname, date_of_birth, gender, phone, email, address, avatar, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.fullname, 
        data.date_of_birth, 
        data.gender, 
        data.phone, 
        data.email, 
        data.address, 
        data.avatar, 
        hashedPassword  // Sử dụng mật khẩu đã mã hóa
      ]
    );
    return result.insertId;
  },

  async addAgeGroups(athleteId, ageGroupIds, connection) {
    for (const agId of ageGroupIds) {
      await connection.query(
        "INSERT INTO athlete_age_group (athlete_id, age_group_id) VALUES (?, ?)",
        [athleteId, agId]
      );
    }
  },

  async addSports(athleteId, sportIds, connection) {
    for (const sId of sportIds) {
      await connection.query(
        "INSERT INTO athlete_sport (athlete_id, sport_id) VALUES (?, ?)",
        [athleteId, sId]
      );
    }
  },

  async getAll(limit, offset) {
    const [rows] = await pool.query("SELECT * FROM athlete LIMIT ? OFFSET ?", [limit, offset]);
    return rows;
  },

  async countAll() {
    const [[{ total }]] = await pool.query("SELECT COUNT(*) as total FROM athlete");
    return total;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM athlete WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, data) {
    let sql = "UPDATE athlete SET fullname = ?, date_of_birth = ?, gender = ?, phone = ?, email = ?, address = ?, avatar = ?";
    let params = [
      data.fullname,
      data.date_of_birth,
      data.gender,
      data.phone,
      data.email,
      data.address,
      data.avatar
    ];

    // Chỉ cập nhật mật khẩu nếu có gửi mật khẩu mới
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
      sql += ", password = ?";
      params.push(hashedPassword);
    }

    sql += " WHERE id = ?";
    params.push(id);

    const [result] = await pool.query(sql, params);
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM athlete WHERE id = ?", [id]);
    return result.affectedRows;
  }
};

module.exports = AthleteModel;