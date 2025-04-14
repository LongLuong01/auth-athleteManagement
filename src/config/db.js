const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'interchange.proxy.rlwy.net',
  port: 11131,
  user: 'root',
  password: 'WxYoYqmkZdclbmmtTgQdRcJJXFXVjWvp',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});




module.exports = pool;
