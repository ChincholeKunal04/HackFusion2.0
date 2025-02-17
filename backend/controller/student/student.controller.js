import Student from "../../models/Student.model.js";
import HealthReport from "../../models/HealthReport.model.js"
import LeaveReport from "../../models/LeaveReport.model.js"
import transporter from "../../config/emailconfig.js";

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

const reportLeave = async (req, res) => {
    try {

        const { studentId, reason } = req.body;

        const newLeave = new LeaveReport({
            student: studentId,
            reason
        });
        await newLeave.save();

        const student = await Student.findById(studentId); 

        if(!student){
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.parentEmail,
            subject: "Student Leave Notification",
            text: `Dear Parent,\n\n${student.name} has reported to leave the campus.\nReason: ${reason}\n\nThis is an automated safety notification.\n\nRegards,\nCollege Administration`
        };
        
        await transporter.sendMail(mailOptions)

        newLeave.isNotified = true;
        await newLeave.save();

        res.status(201).json({
            success: true,
            message: "Leave request submitted and parents notified."
        });

    } catch (error) {
        console.log(error)
        req.status(500).json({
            success : false,
            message : "Internal server error when leave report send",
        })
    }
}

const fetchAllHealthReports = async (req, res) => {
    try {

        const studentId = req.user.userId;

        const reports = await HealthReport.find({ student: studentId })
        .populate("reportedBy", "name email") 
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "All health reports retrieved successfully.",
            data: reports
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Internal server error while fetching health report"
        })
    }
}

const fetchHealthReportStatus = async (req, res) => {
    try {
        
        const { reportId } = req.params;
        const studentId = req.user.userId;

        const report = await HealthReport.findOne({ _id: reportId, student: studentId });

        if(!report){
            return res.status(404).json({
                success: false,
                message: "Health report not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Health report status retrieved successfully.",
            data: {
                sicknessDetails: report.sicknessDetails,
                status: report.status
            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching health report status."
        });
    }
}

const fetchAllLeaveReports = async (req, res) => {
    try {
      
        const studentId = req.user.userId;

        const reports = await LeaveRequest.find({ student: studentId })
            .sort({ createdAt: -1 }); 
  
        res.status(200).json({
            success: true,
            message: "All leave reports retrieved successfully.",
            data: reports
        });
  
    } catch (error) {
        console.error("Error fetching leave reports:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching leave reports."
        });
    }
};

export { getStudentProfile, updateStudentProfile, reportSickness, reportLeave, fetchAllHealthReports, fetchHealthReportStatus, fetchAllLeaveReports }