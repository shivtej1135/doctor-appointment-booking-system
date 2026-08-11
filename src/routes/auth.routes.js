const express = require("express");
const router=express.Router();
const {registerUser,loginUser }=require("../controllers/auth.controller");
const validate = require("../middlewares/validation.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const authRateLimiter = require("../middlewares/rateLimiter.middleware");



router.post("/register", validate(registerSchema), registerUser);
router.post("/login", authRateLimiter,validate(loginSchema), loginUser);

module.exports = router;