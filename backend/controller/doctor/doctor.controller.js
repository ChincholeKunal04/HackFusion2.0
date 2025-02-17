import HealthReport from "../../models/HealthReport.model.js";
import Student from "../../models/Student.model.js";
import transporter from "../../config/emailconfig.js";

const approveHealthReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await HealthReport.findByIdAndUpdate(
            reportId,
            { status: "approved" },
            { new: true }
        ).populate("student");
  
        if (!report) {
            return res.status(404).json({
            success: false,
            message: "Health report not found."
            });
        }
  
        if (report.isNotified) {
            return res.status(400).json({
            success: false,
            message: "Notification already sent."
            });
        }

        const student = await Student.findById(report.student).populate("classCoordinator");
        const coordinator = student.classCoordinator;
  
        if (!coordinator) {
            return res.status(404).json({
            success: false,
            message: "Class coordinator not found."
            });
        }
  
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: coordinator.email,
            subject: "Health Report Approved",
            text: `Dear ${coordinator.name},\n\n${student.name} has been reported sick and the health report has been approved.\n\nDetails: ${report.sicknessDetails}\n\nRegards,\nCollege Health Center`
        };
    
        await transporter.sendMail(mailOptions);

        report.isNotified = true;
        await report.save();
  
        res.status(200).json({
            success: true,
            message: "Health report approved and coordinator notified."
        });
    } catch (error) {
        console.error("Error approving health report:", error);
        res.status(500).json({
            success: false,
            message: "Server error while approving health report."
        });
    }
};

const fetchAllHealthReports = async (req, res) => {
    try {

    const reports = await HealthReport.find()
        .populate("student", "name email registrationNumber") 
        .populate("reportedBy", "name email"); 

    res.status(200).json({
        success: true,
        message: "All health reports retrieved successfully.",
        data: reports
    });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching health reports."
        });
    }
}

const rejectHealthReport = async (req,res) => {
    try {
        const report = await HealthReport.findById(reportId);
    
        if (!report) {
        return res.status(404).json({
            success: false,
            message: "Health report not found."
            });
        }

        if (report.status !== "pending") {
            return res.status(400).json({
              success: false,
              message: "Only pending health reports can be rejected."
            });
        }

        report.status = "rejected";
        await report.save();

        res.status(200).json({
            success: true,
            message: "Health report rejected successfully."
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while rejecting health report."
        })
    }
}

export { approveHealthReport, fetchAllHealthReports, rejectHealthReport }
