import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];
        console.log("Token from Cookie:", token); // Debugging line to check if token is received

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging line to check if token is decoded properly

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        // The decoded token has "UserId", so we access it correctly
        const user = await User.findById(decoded.UserId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Attach the user object to the request object
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
