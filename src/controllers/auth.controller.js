const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

require("dotenv").config();

// đăng ký tài khoản
const register = async (req, res) => {
  const { fullname, email, password, role } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    // ktra email đã tồn tại chưa
    pool.query(
      "SELECT * FROM user WHERE email =?",
      [email],
      async (error, results) => {
        if (error)
          return res.status(500).json({ message: "Lỗi database", error });

        if (results.length > 0) {
          return res.status(400).json({ message: "Email đã được sử dụng!" });
        }

        // mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // thêm user mới vào db
        pool.query(
          "INSERT INTO user (fullname, email, password, role) VALUES (?, ?, ?, ?)",
          [fullname, email, hashedPassword, role || "hlv"],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Đăng ký không thành công", error: err });
            }
            return res.status(201).json({ message: "Đăng ký thành công!" });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server!", error });
  }
};

// đăng nhập tài khoản
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;
    let role;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập email và mật khẩu" });
    }

    const [users] = await pool
      .query("SELECT * FROM user WHERE email = ?", [email]);
    if (users.length > 0) {
      user = users[0];
      role = user.role;
    }
    // Nếu không tìm thấy trong `user`, kiểm tra `athlete`
    if (!user) {
      const [athletes] = await pool
        .query("SELECT * FROM athlete WHERE email = ?", [email]);
      if (athletes.length > 0) {
        user = athletes[0];
        role = "athlete";
        user.athlete_id = user.id; // Thêm athlete_id vào user để dễ dàng truy cập
      }
    }

    // Nếu không tìm thấy user/athlete
    if (!user) return res.status(401).json({ message: "Email không tồn tại!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác!" });
    }

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ message: "Đăng nhập thành công!", token, user });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    return res.status(500).json({ message: "Lỗi server!", error });
  }
};

module.exports = { register, login };
