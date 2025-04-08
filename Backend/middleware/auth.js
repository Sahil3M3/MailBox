const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization; // Direct token without "Bearer "

        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Invalid token structure" });
        }

        // Find the user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({ message: "Server error during authentication" });
    }
};

module.exports = authenticate;
