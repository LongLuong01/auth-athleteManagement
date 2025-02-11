const express = require('express');
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

// route thu nghiem (admin/hlv moi login dc)
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "Xác thực thành công! ", user: req.user})
});


module.exports = router;

