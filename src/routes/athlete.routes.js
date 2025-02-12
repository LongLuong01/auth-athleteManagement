const express = require('express');
const authenticateToken = require('../middleware/auth.middleware');
const router = express.Router();
const { createAthlete, getAthletes, getAthleteById, updateAthlete, deleteAthlete } = require('../controllers/athlete.controller');

// cac route deu yc dang nhap
router.post("/", authenticateToken, createAthlete); // them vdv
router.get("/", authenticateToken, getAthletes); // lay danh sach vdv
router.get("/:id", authenticateToken, getAthleteById) // lay vdv theo id
router.put("/:id", authenticateToken, updateAthlete); // cap nhat vdv
router.delete("/:id", authenticateToken, deleteAthlete); // xoa vdv

// route thu nghiem (admin/hlv moi login dc)
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "Xác thực thành công! ", user: req.user})
});


module.exports = router;

