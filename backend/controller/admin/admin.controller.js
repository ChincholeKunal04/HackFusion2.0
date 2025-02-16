import Student from "../../models/Student.model.js";
import Teacher from "../../models/Teacher.model.js";
import mongoose from "mongoose";

const verifyStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findByIdAndUpdate(
            studentId,
            { isVerified: true },
            { new: true } 
        );

        if (!student) {
            return res.status(404).json({ 
                success: false,
                message: "Student not found."
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Student verified successfully."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error during student verification."
        });
        
    }
}

const verifyTeacher = async (req, res) => {
    try {

        const { teacherId } = req.params;
        // console.log("Teacher ID received:", teacherId);


        const teacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { isVerified: true },
            { new: true } 
        );

        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid teacher ID format." 
            });
        }

        if (!teacher) {
            return res.status(404).json({ 
                success: false,
                message: "Teacher not found."
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Teacher verified successfully."
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error during teacher verification."
        });
    }
}

export { verifyStudent, verifyTeacher };