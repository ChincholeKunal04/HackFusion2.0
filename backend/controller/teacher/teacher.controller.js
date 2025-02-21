import LeaveReport from "../../models/LeaveReport.model.js";
import Student from "../../models/Student.model.js";
import HealthReport from "../../models/HealthReport.model.js";
import CheatingRecord from "../../models/CheatingRecord.model.js";

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

const reportCheating = async (req, res) => {
    try {
        const { registrationNumber, reason, complaint } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image as proof."
            });
        }

        const proofImageUrl = req.file.path;

        const student = await Student.findOne({ registrationNumber });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found with this registration number."
            });
        }

        const newCheatingRecord = new CheatingRecord({
            student : student._id,
            name : student.name,
            registrationNumber: student.registrationNumber,
            reason,
            proof: proofImageUrl,
            complaint
        });

        await newCheatingRecord.save();

        res.status(201).json({
            success: true,
            message: "Cheating report added successfully.",
            data: newCheatingRecord
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error while reporting cheating."
        });
    }
}

export { fetchAllLeaveReports, fetchAllApprovedHealthReports, reportCheating }