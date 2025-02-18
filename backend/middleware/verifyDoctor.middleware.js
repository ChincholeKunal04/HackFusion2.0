import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.model.js";

const verifyDoctor = async (req, res, next) => {
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
    
        const doctor = await Doctor.findById(req.user.userId);
        if (!doctor || doctor.role !== "doctor" || !doctor.isVerified) {
            return res.status(403).json({ 
            success: false,
            message: "Access denied. Only verified doctors can access this resource." 
            });
        }

        req.user = {
            userId: doctor._id,
            role: doctor.role
        };
  
        next();

    } catch (error) {
        console.error("Error in verifyDoctor middleware:", error);
        res.status(403).json({ 
            success: false,
            message: "Invalid or expired token." 
        });
    }
  };

  export { verifyDoctor }