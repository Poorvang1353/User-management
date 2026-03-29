const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/authController");
const { signupValidation, loginValidation, handleValidationErrors } = require("../middleware/validationMiddleware");

router.post("/signup", signupValidation, handleValidationErrors, signUp);
router.post("/login", loginValidation, handleValidationErrors, login);

module.exports = router;