const jwt = require("jsonwebtoken");
const { findUserByID } = require("../models/user.model");

const verifyToken = async (req, res, next) => {
    const authHeaderValue = req.headers.authorization;

    if (!authHeaderValue) {
        return res.status(401).json({
            message: "Authorization token is missing"
        });
    }

    const token = authHeaderValue.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await findUserByID(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyToken;