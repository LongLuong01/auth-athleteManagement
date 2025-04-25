const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

// Định nghĩa các cấp độ log
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Định nghĩa màu sắc cho từng cấp độ log
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Thêm màu sắc vào winston
winston.addColors(colors);

// Định dạng log
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Tạo các transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  // Error log file
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '../logs/error/error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    level: 'error',
  }),
  // Access log file
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '../logs/access/access-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    level: 'http',
  }),
  // Combined log file
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '../logs/combined/combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
  }),
];

// Tạo logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  levels,
  format: logFormat,
  transports,
});

// Tạo stream cho morgan
const stream = {
  write: (message) => logger.http(message.trim()),
};

module.exports = { logger, stream }; 