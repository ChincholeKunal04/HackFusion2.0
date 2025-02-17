import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.model.js";

const verifyTeacher = async (req, res, next) => {
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

        const teacher = await Teacher.findById(req.user.userId);
        if (!teacher || teacher.role !== "teacher" || !teacher.isVerified) {
        return res.status(403).json({ 
            success: false,
            message: "Access denied. Only verified teachers can access this resource." 
        });
        }

        req.user = {
        userId: teacher._id,
        role: teacher.role
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

export { verifyTeacher }

