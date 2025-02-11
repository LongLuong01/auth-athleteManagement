const express = require('express');
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register); // sign up - đăng kí
router.post("/login", login); // sign in - đăng nhậpnhập

module.exports = router;

