import jwt from "jsonwebtoken";
import Student from "../models/Student.model.js";

const verifyStudent = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ 
              success: false,
              message: "Access denied. No token provided." 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const student = await Student.findById(req.user.userId);
        if (!student || student.role !== "student" || !student.isVerified) {
            return res.status(403).json({ 
                success: false,
                message: "Access denied. Only verified students can access this resource." 
            });
        }

        req.user = {
            userId: student._id,
            role: student.role
        };
      
        next();
        
    } catch (error) {
        console.log(error)
        res.status(403).json({ 
            success: false,
            message: "Invalid or expired token." 
        });
    }
}

export { verifyStudent };