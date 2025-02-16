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

  export { approveHealthReport }
