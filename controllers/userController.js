const users = require("../models/userModel");

exports.getUsers = async (req, res, next) => {
    try {
        const { role, name } = req.query;
        let query = {};

        if (role) {
            query.role = role;
        }

        if (name) {
            query.name = { $regex: name, $options: "i" };
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const user = await users.find(query)
            .skip(skip)
            .limit(limit)
            .select("-password");

        res.json(
            {
                success: true,
                page,
                limit,
                message: "Users fetched successfully",
                user
            }
        );
    } catch (error) {
        next(error);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const user = await users.findById(req.user.id).select("-password");
        res.json(
            {
                success: true,
                message: "User fetched successfully",
                user
            }
        );
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await users.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User updated successfully",
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.uploadProfileImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });
        }

        const user = await users.findByIdAndUpdate(req.user.id, {
            profileImage: req.file.path
        }, {
            new: true
        }).select("-password");

        res.json({
            success: true,
            message: "Profile image uploaded successfully",
            user
        });
    } catch (error) {
        next(error);
    }
};