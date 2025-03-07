const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const pool = require("./config/db");
const { compareSync } = require("bcryptjs");

// routes variables
const authRoutes = require("./routes/auth.routes");
const athleteRoutes = require("./routes/athlete.routes");
const healthRecordsRoutes = require("./routes/healthRecords.routes");
const metricGroupRoutes = require("./routes/metricGroup.routes")
const healthMetricRoutes = require("./routes/healthMetric.routes")

// run app
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/athletes", athleteRoutes);
app.use("/api/health-records", healthRecordsRoutes)
app.use("/api/metric-groups", metricGroupRoutes);
app.use("/api/health-metrics", healthMetricRoutes);

// Console log
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http:localhost:${PORT}`);
});


