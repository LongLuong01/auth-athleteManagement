const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // Chuyển tiếp middleware
    } catch (error) {
        let message = 'Invalid token';
        if (error.name === 'TokenExpiredError') message = 'Token expired';
        else if (error.name === 'JsonWebTokenError') message = 'Invalid token';

        return res.status(401).json({ message });
    }
};

module.exports = authMiddleware;


