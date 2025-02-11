const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    // lay token tu header authorization
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied' });
    }

    // Kiểm tra format token
    const token = authHeader.split(".")[1]; // Tách từ "Bearer <JWT_TOKEN>"
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xác thực token
        req.user = decoded; // Lưu user đã xác thực vào req
        next(); // Chuyển tiếp sang middleware tiếp theo
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;



