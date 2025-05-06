const WellbeingReview = require("../models/wellBeingReview.model");

exports.createReview = async (req, res) => {
  try {
    const newReview = await WellbeingReview.create(req.body);
    res.status(201).json({ message: "Review added successfully", newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await WellbeingReview.getAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByAthleteId = async (req, res) => { 
  try {
    const { athlete_id, page = 1, limit = 30 } = req.query;
    
    if (!athlete_id) {
      return res.status(400).json({ message: "Thiếu athlete_id" });
    }

    const offset = (page - 1) * limit;
    const reviews = await WellbeingReview.getByAthleteId(athlete_id, parseInt(limit), parseInt(offset));

    // Đếm tổng số review
    const total = await WellbeingReview.countByAthleteId(athlete_id);
    
    res.json({ reviews, total });
  } catch (error) {
    console.error("Lỗi khi lấy review:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}

const getAthletes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const offset = (page - 1) * limit;

  try {
    // Không trả về password
    const [rows] = await pool.query(
      "SELECT id, fullname, date_of_birth, gender, phone, email, address, avatar FROM athlete LIMIT ? OFFSET ?",
      [limit, offset]
    );
    // Đếm tổng số bản ghi (nếu muốn trả về tổng số trang)
    const [[{ total }]] = await pool.query("SELECT COUNT(*) as total FROM athlete");

    res.status(200).json({
      data: rows,
      page,
      limit,
      total
    });
  } catch (error) {
    // Log lỗi chi tiết ở server, trả về message chung cho client
    console.error("Lỗi khi lấy danh sách vận động viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách vận động viên!" });
  }
};

