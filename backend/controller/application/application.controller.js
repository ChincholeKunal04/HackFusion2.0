import Application from "../../models/Application.model.js";
import Student from "../../models/Student.model.js";
import Teacher from "../../models/Teacher.model.js"

const submitApplication = async (req, res) => {
    try {
        const { type, description, estimatedCost, proposedDate } = req.body;
        const applicantId = req.user.userId;
        const applicantType = req.user.role;

        if (!["student", "teacher"].includes(applicantType)) {
            return res.status(403).json({
                success: false,
                message: "Only students and teachers can submit applications."
            });
        }

        const formattedApplicantType = applicantType === "student" ? "Student" : "Teacher";

        let attachments = [];
        if (req.files && req.files.length > 0) {
            attachments = req.files.map(file => file.path); 
        }

        if (type === "Budget" && !estimatedCost) {
            return res.status(400).json({ 
                success: false, 
                message: "Estimated cost is required for budget applications." 
            });
        }
        
        if (type === "Event" && !proposedDate) {
            return res.status(400).json({ 
                success: false, 
                message: "Proposed date is required for event applications." 
            });
        }

        const newApplication = new Application({
            applicant: applicantId,
            applicantType: formattedApplicantType,
            type,
            description,
            estimatedCost,
            proposedDate,
            attachments 
        });

        await newApplication.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully.",
            data: newApplication
        });

    } catch (error) {
        console.log(error),
        res.status(500).json({ 
            success: false, 
            message: "Internal server error while submitting application."
        });
    }
}

const reviewApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status, adminRemark } = req.body;
        const adminId = req.user.userId; 

        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Only 'Approved' or 'Rejected' allowed."
            });
        }

        if (!adminRemark || adminRemark.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Admin remark is required for approval or rejection."
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }

        if (!["Pending", "In Review"].includes(application.status)) {
            return res.status(400).json({
                success: false,
                message: `Application is already ${application.status}. It cannot be modified.`
            });
        }

        application.status = status;
        application.adminRemark = adminRemark;
        application.assignedTo = adminId; 
        application.updatedAt = new Date();

        await application.save();

        res.status(200).json({
            success: true,
            message: `Application ${status.toLowerCase()} successfully.`,
            data: application
        });
        
    } catch (error) {
        console.log(error),
        res.status(500).json({
            success: false,
            message: "Server error while reviewing application."
        });
    }
}

const fetchUnreviewedApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            status: { $nin: ["Approved", "Rejected"] }
        })
        .populate("applicant", "name role registrationNumber") 
        .sort({ escalationCount: -1, createdAt: 1 }); 

        const formattedApplications = applications.map(application => {
            let applicantDetails = {
                name: application.applicant.name,
                role: application.applicantType
            };

            if (application.applicantType === "Student" && application.applicant.registrationNumber) {
                applicantDetails.registrationNumber = application.applicant.registrationNumber;
            }

            return {
                _id: application._id,
                type: application.type,
                description: application.description,
                status: application.status,
                applicant: applicantDetails
            };
        });

        res.status(200).json({
            success: true,
            message: "Unreviewed applications retrieved successfully.",
            data: formattedApplications
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching unreviewed applications."
        });
    }
}

const fetchSpecificApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await Application.findById(applicationId)
            .populate("applicant", "name registrationNumber role"); // Include applicant details

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Application retrieved successfully.",
            data: {
                _id: application._id,
                type: application.type,
                description: application.description,
                status: application.status,
                attachments: application.attachments,
                applicant: {
                    name: application.applicant.name,
                    registrationNumber: application.applicant?.registrationNumber,
                    role: application.applicant.role
                }
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching application."
        });
    }
};

const fetchAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
        .populate("applicant", "name role registrationNumber")
        .sort({ createdAt : 1 });

        const formattedApplications = applications.map(application => {
            let applicantDetails = {
                name: application.applicant.name,
                role: application.applicantType
            };

            if (application.applicantType === "Student" && application.applicant.registrationNumber) {
                applicantDetails.registrationNumber = application.applicant.registrationNumber;
            }

            return {
                _id: application._id,
                type: application.type,
                description: application.description,
                status: application.status,
                applicant: applicantDetails
            };
        });

        res.status(200).json({
            success: true,
            message: "applications retrieved successfully.",
            data: formattedApplications
        });        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching application."
        });
    }
}

export { submitApplication, reviewApplication, fetchUnreviewedApplications, fetchAllApplications, fetchSpecificApplication }