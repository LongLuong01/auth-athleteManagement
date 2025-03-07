const express = require('express');
const authenticateToken = require('../middleware/auth.middleware');
const router = express.Router();
const { createAthlete, getAthletes, getAthleteById, updateAthlete, deleteAthlete } = require('../controllers/athlete.controller');

// Các route đều yêu cầu đăng nhập
router.post("/", createAthlete); // Thêm vận động viên
router.get("/", getAthletes); // Lấy danh sách vận động viên
router.get("/:id", getAthleteById); // Lấy vận động viên theo ID
router.put("/:id", updateAthlete); // Cập nhật vận động viên
router.delete("/:id", deleteAthlete); // Xóa vận động viên

// // Route thử nghiệm (admin/HLV mới login được)
// router.get('/protected', authenticateToken, (req, res) => {
//     res.json({ message: "Xác thực thành công!", user: req.user });
// });

module.exports = router;
