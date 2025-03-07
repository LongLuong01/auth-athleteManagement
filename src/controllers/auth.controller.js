const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

require("dotenv").config();

// đăng ký tài khoản
const register = async(req, res) => {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin"});
    }
    
    try {
        // ktra email đã tồn tại chưa
        pool.query("SELECT * FROM user WHERE email =?", [email], async (error, results) => {
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
                        return res.status(500).json({ message: "Đăng ký không thành công", error: err });
                    }
                    return res.status(201).json({ message: "Đăng ký thành công!" });
                }
            );
        });
        
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server!", error});
    }
};


// đăng nhập tài khoản
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu!" });
    }

    try { 
        // tìm user theo email
        pool.query("SELECT * FROM user WHERE email = ?", [email], async (err, results) => {
            if (results.length ===0) {
                return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
            }

            const user = results[0];

            // kiểm tra mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
            }

            // tạo token jwt
            const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: "1h" });

            return res.status(200).json({ message: "Đăng nhập thành công!", token });
        });

    } catch (error) {
        return res.status(500).json({ message: "Lỗi server!", error })
    }
};

module.exports = { register, login };


