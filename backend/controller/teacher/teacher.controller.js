import LeaveReport from "../../models/LeaveReport.model.js";
import Student from "../../models/Student.model.js";
import HealthReport from "../../models/HealthReport.model.js";

const fetchAllLeaveReports = async (req, res) => {
    try {
        const teacherId = req.user.userId;

        const students = await Student.find({ classCoordinator: teacherId }).select("_id");

        const studentIds = students.map(student => student._id);

        const leaveReports = await LeaveReport.find({ student: { $in: studentIds } })
            .populate("student", "name email registrationNumber")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "All leave reports retrieved successfully.",
            data: leaveReports
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching leave reports."
        });
    }
}

const fetchAllApprovedHealthReports = async (req, res) => {
    try {
        const teacherId = req.user.userId;

        const students = await Student.find({ classCoordinator: teacherId }).select("_id");

        const studentIds = students.map(student => student._id);

        const healthReports = await HealthReport.find({ student: { $in: studentIds }, status: "approved" })
            .populate("student", "name email registrationNumber")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "All approved health reports retrieved successfully.",
            data: healthReports
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching health reports."
        });
    }
}

export { fetchAllLeaveReports, fetchAllApprovedHealthReports }