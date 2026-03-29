const users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userAlreadyExist = await users.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ message: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );
        res.status(201).json(
            {
                message: "User created successfully",
                user
            }
        );
    } catch (error) {
        next(error);
    }
}


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json(
            {
                message: "User logged in successfully",
                user,
                token
            }
        );
    } catch (error) {
        next(error);
    }
}
