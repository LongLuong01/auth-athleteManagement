const express = require('express');
const authenticateToken = require('../middleware/auth.middleware');
const { validateAthlete, handleValidationErrors } = require('../middleware/validation.middleware');
const router = express.Router();
const { createAthlete, getAthletes, getAthleteById, updateAthlete, deleteAthlete } = require('../controllers/athlete.controller');

// Các route đều yêu cầu đăng nhập
router.post("/", authenticateToken, validateAthlete, handleValidationErrors, createAthlete); // Thêm vận động viên
router.get("/", authenticateToken, getAthletes); // Lấy danh sách vận động viên
router.get("/:id", authenticateToken, getAthleteById); // Lấy vận động viên theo ID
router.put("/:id", authenticateToken, validateAthlete, handleValidationErrors, updateAthlete); // Cập nhật vận động viên
router.delete("/:id", authenticateToken, deleteAthlete); // Xóa vận động viên

// // Route thử nghiệm (admin/HLV mới login được)
// router.get('/protected', authenticateToken, (req, res) => {
//     res.json({ message: "Xác thực thành công!", user: req.user });
// });

module.exports = router;
