// middleware/verifyStudent.middleware.js
import jwt from "jsonwebtoken";
import Student from "../models/Student.model.js";

const verifyStudent = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "Access denied. No token provided." 
        });
        }

        // Verify the token and extract payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Check if the user is a verified student
        const student = await Student.findById(req.user.userId);
        if (!student || student.role !== "student" || !student.isVerified) {
            return res.status(403).json({ 
                success: false,
                message: "Access denied. Only verified students can access this resource." 
            });
        }

        // Attach user details to request
        req.user = {
            userId: student._id,
            role: student.role
        };

        next();
        
    } catch (error) {
            console.error("Error in verifyStudent middleware:", error);
            res.status(403).json({ 
                success: false,
                message: "Invalid or expired token." 
            });
    }
};

export { verifyStudent }
