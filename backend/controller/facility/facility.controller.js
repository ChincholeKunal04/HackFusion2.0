import Facility from "../../models/Facility.model.js";
import Teacher from "../../models/Teacher.model.js"
import Student from "../../models/Student.model.js"

const bookFacility = async (req, res) => {
    try {
        const { facilityType, purpose, date } = req.body;
        const applicantId = req.user.userId;
        const applicantType = req.user.role;

        if (!["student", "teacher"].includes(applicantType)) {
            return res.status(403).json({
                success: false,
                message: "Only students and teachers can book facilities.",
            });
        }

        if (!facilityType || !purpose || !date) {
            return res.status(400).json({
                success: false,
                message: "Please provide facility type, purpose, and date.",
            });
        }

        let user;
        if (applicantType === "student") {
            user = await Student.findById(applicantId);
        } else if (applicantType === "teacher") {
            user = await Teacher.findById(applicantId);
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const existingBooking = await Facility.findOne({
            facilityType,
            date,
            status: { $in: ["pending", "approved"] },
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "The facility is already booked for the requested date.",
            });
        }

        const newBooking = new Facility({
            facilityType,
            purpose,
            date,
            bookedBy: applicantId,
            bookedByModel: applicantType === "student" ? "Student" : "Teacher", 
        });

        await newBooking.save();

        res.status(201).json({
            success: true,
            message: "Facility booking request submitted successfully.",
            booking: newBooking,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error during facility booking.",
        });
    }
};

const fetchFacilityApplications = async (req, res) => {
    try {
        const applications = await Facility.find()
            .sort({ createdAt: -1 })
            .lean(); 

        const populatedApplications = await Promise.all(
            applications.map(async (application) => {
                let applicantDetails;

                if (application.bookedByModel === "Student") {
                    applicantDetails = await Student.findById(application.bookedBy)
                        .select("name email") 
                        .lean();
                } else if (application.bookedByModel === "Teacher") {
                    applicantDetails = await Teacher.findById(application.bookedBy)
                        .select("name email") 
                        .lean();
                }

                return {
                    ...application,
                    applicant: applicantDetails || null, 
                };
            })
        );

        res.status(200).json({
            success: true,
            message: "Facility applications fetched successfully.",
            applications: populatedApplications,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching facility applications.",
        });
    }
};

const reviewFacilityApplication = async (req, res) => {
    try {
        const { applicationId } = req.params; 
        const { status, remarks } = req.body; 

        if (!status || !remarks) {
            return res.status(400).json({
                success: false,
                message: "Please provide status and remarks.",
            });
        }

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Status must be 'approved' or 'rejected'.",
            });
        }

        const application = await Facility.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Facility application not found.",
            });
        }

        if (application.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "This application has already been reviewed.",
            });
        }

        application.status = status;
        application.remarks = remarks;
        await application.save();

        res.status(200).json({
            success: true,
            message: "Facility application status updated successfully.",
            application,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while reviewing facility application.",
        });
    }
};

const fetchFacilityApplicationById = async (req, res) => {
    try {
        const { applicationId } = req.params; 

        if (!applicationId) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid application ID.",
            });
        }

        const application = await Facility.findById(applicationId).lean();
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Facility application not found.",
            });
        }

        let applicantDetails;
        if (application.bookedByModel === "Student") {
            applicantDetails = await Student.findById(application.bookedBy)
                .select("name email")
                .lean();
        } else if (application.bookedByModel === "Teacher") {
            applicantDetails = await Teacher.findById(application.bookedBy)
                .select("name email") 
                .lean();
        }

        const populatedApplication = {
            ...application,
            applicant: applicantDetails || null,
        };

        res.status(200).json({
            success: true,
            message: "Facility application fetched successfully.",
            application: populatedApplication,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching facility application.",
        });
    }
};

export { bookFacility, fetchFacilityApplications, reviewFacilityApplication, fetchFacilityApplicationById };