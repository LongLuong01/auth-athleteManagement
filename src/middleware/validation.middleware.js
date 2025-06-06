const { body, validationResult, param } = require('express-validator');

// Validation rules cho athlete
const validateAthlete = [
  body('fullname')
    .notEmpty()
    .withMessage('Họ tên không được để trống')
    .isLength({ min: 2, max: 100 })
    .withMessage('Họ tên phải từ 2 đến 100 ký tự'),
  
  body('date_of_birth')
    .notEmpty()
    .withMessage('Ngày sinh không được để trống')
    .isISO8601()
    .withMessage('Ngày sinh không hợp lệ'),
  
  body('gender')
    .notEmpty()
    .withMessage('Giới tính không được để trống')
    .isIn(['male', 'female', 'other'])
    .withMessage('Giới tính không hợp lệ'),
  
  body('phone')
    .notEmpty()
    .withMessage('Số điện thoại không được để trống')
    .matches(/^[0-9]{10,11}$/)
    .withMessage('Số điện thoại không hợp lệ'),
  
  body('email')
    .notEmpty()
    .withMessage('Email không được để trống')
    .isEmail()
    .withMessage('Email không hợp lệ'),
  
  body('address')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Địa chỉ không được quá 255 ký tự'),
  
  // body('avatar')
  //   .optional()
  //   .isURL()
  //   .withMessage('Avatar phải là URL hợp lệ'),
  
  body('password')
    .notEmpty()
    .withMessage('Mật khẩu không được để trống')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .withMessage('Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'),

  // Khi cập nhật, mật khẩu là tùy chọn
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .withMessage('Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt')
];

// Validation rules cho age_group
const validateAgeGroup = [
  body('name')
    .notEmpty()
    .withMessage('Tên nhóm tuổi không được để trống')
    .isLength({ max: 255 })
    .withMessage('Tên nhóm tuổi không được vượt quá 255 ký tự'),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Mô tả không được vượt quá 1000 ký tự')
];

// Middleware xử lý kết quả validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

const validateSport = [
  body("name")
    .notEmpty().withMessage("Tên môn thể thao không được để trống")
    .isLength({ max: 100 }).withMessage("Tên môn thể thao không được vượt quá 100 ký tự"),
  body("description")
    .optional()
    .isLength({ max: 1000 }).withMessage("Mô tả không được vượt quá 1000 ký tự")
];

const validateSportCategory = [
  body("group_sport_id")
    .notEmpty().withMessage("group_sport_id là bắt buộc")
    .isInt().withMessage("group_sport_id phải là số nguyên"),
  body("sport_id")
    .notEmpty().withMessage("sport_id là bắt buộc")
    .isInt().withMessage("sport_id phải là số nguyên")
];

const validateAthleteAgeGroup = [
  param('athleteId')
    .isInt()
    .withMessage('Athlete ID phải là số nguyên'),
  body('age_group_ids')
    .isArray()
    .withMessage('age_group_ids phải là một mảng')
    .notEmpty()
    .withMessage('age_group_ids không được rỗng')
    .custom((value) => value.every(Number.isInteger))
    .withMessage('Tất cả các phần tử trong age_group_ids phải là số nguyên')
];

const validateAthleteSport = [
  param('athleteId')
    .isInt()
    .withMessage('Athlete ID phải là số nguyên'),
  body('sport_ids')
    .isArray()
    .withMessage('sport_ids phải là một mảng')
    .notEmpty()
    .withMessage('sport_ids không được rỗng')
    .custom((value) => value.every(Number.isInteger))
    .withMessage('Tất cả các phần tử trong sport_ids phải là số nguyên')
];

module.exports = {
  validateAthlete,
  validateAgeGroup,
  validateSport,
  validateSportCategory,
  handleValidationErrors,
  validateAthleteAgeGroup,
  validateAthleteSport
}; 