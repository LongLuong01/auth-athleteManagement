const db = require("../config/db");

// Thêm dữ liệu sức khỏe mới
const addHealthRecord = async (req, res) => {
    try {
        const { athlete_id, metric_type, metric_value, unit, recorded_at } = req.body;

        if (!athlete_id || !metric_type || !metric_value || !unit || !recorded_at) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Kiểm tra quyền: chỉ admin hoặc chính vận động viên mới được ghi dữ liệu của mình
        if (req.user.role !== 'admin' && req.user.id !== athlete_id) {
            return res.status(403).json({ message: "Permission denied" });
        }

        // Lưu vào database
        const query = `
            INSERT INTO athlete_health_records (athlete_id, metric_type, metric_value, unit, recorded_at) 
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.execute(query, [athlete_id, metric_type, metric_value, unit, recorded_at]);

        res.status(201).json({ message: "Health record added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Xuất controller
module.exports = { addHealthRecord };

