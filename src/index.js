const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan');
require("dotenv").config();

const pool = require("./config/db");
const { logger, stream } = require("./config/logger");
const { compareSync } = require("bcryptjs");

// // Test các cấp độ log
// logger.info('Thông tin khởi động server');
// logger.warn('Cảnh báo: Đang sử dụng port mặc định');
// logger.debug('Debug: Chi tiết cấu hình');
// logger.error('Lỗi: Không thể kết nối database');

// routes variables
const authRoutes = require("./routes/auth.routes");
const athleteRoutes = require("./routes/athlete.routes");
const healthRecordsRoutes = require("./routes/healthRecords.routes");
const metricGroupRoutes = require("./routes/metricGroup.routes")
const healthMetricRoutes = require("./routes/healthMetric.routes")
const wellbeingRoutes = require("./routes/wellbeing.routes");
const ageGroupRoutes = require("./routes/ageGroup.routes");
const athleteAgeGroupRoutes = require("./routes/athleteAgeGroup.routes");

// run app
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/athletes", athleteRoutes);
app.use("/api/health-records", healthRecordsRoutes)
app.use("/api/metric-groups", metricGroupRoutes);
app.use("/api/health-metrics", healthMetricRoutes);
app.use("/api/wellbeing", wellbeingRoutes);
app.use("/api/age-groups", ageGroupRoutes);
app.use("/api/athletes", athleteAgeGroupRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Start server
app.listen(PORT, () => {
    logger.info(`Server đang chạy tại http:localhost:${PORT}`);
});


