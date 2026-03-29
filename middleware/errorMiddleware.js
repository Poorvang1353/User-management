const errorMiddleware = (err, req, res, next) => {
    if (err.name === "MulterError") {
        if (err.code === "LIMIT_UNEXPECTED_FIELD") {
            return res.status(400).json({
                success: false,
                message: `Unexpected field: "${err.field}". Please use "profileImage" as the field name.`
            });
        }
    }

    res.status(err.status || 500).json(
        {
            success: false,
            message: err.message || "Internal server error",
        }
    );
};

module.exports = errorMiddleware;