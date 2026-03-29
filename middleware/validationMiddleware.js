const { body, validationResult } = require("express-validator");

const signupValidation = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation,
    handleValidationErrors
};
