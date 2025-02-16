import Student from "../../models/Student.model.js";
import HealthReport from "../../models/HealthReport.model.js"

const getStudentProfile = async (req, res) => {
    try {
        
        const studentId = req.user.userId;

        const student = await Student.findById(studentId).select("-password");

        if (!student) {
            return res.status(404).json({
              success: false,
              message: "Student not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Student profile fetched successfully.",
            profile: student
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching student profile."
        });
    }
}

const updateStudentProfile = async (req, res) => {
    try {

        const studentId = req.user.userId;

        const { name, class : studentClass } = req.body;

        if (!name && !studentClass) {
            return res.status(400).json({
              success: false,
              message: "No valid fields provided for update."
            });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { name, class: studentClass },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedStudent) {
            return res.status(404).json({
              success: false,
              message: "Student not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Student profile updated successfully.",
            profile: updatedStudent
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while updating student profile."
        });
    }
}

const reportSickness = async (req, res) => {
    try {
        const { studentId, sicknessDetails } = req.body;

        const newReport = new HealthReport({
            student: studentId,
            reportedBy: req.user.userId,
            sicknessDetails
        });
        await newReport.save();
  
        res.status(201).json({
            success: true,
            message: "Health report submitted for approval."
        });
    } catch (error) {
      console.error("Error reporting sickness:", error);
        res.status(500).json({
            success: false,
            message: "Server error while reporting sickness."
        });
    }
  };

export { getStudentProfile, updateStudentProfile, reportSickness }