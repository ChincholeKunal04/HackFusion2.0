import Student from "../../models/Student.model.js";
import Teacher from "../../models/Teacher.model.js";
import Admin from "../../models/Admin.model.js"
import Doctor from "../../models/Doctor.model.js";
import AnonymousComplaint from "../../models/AnonymousComplaint.model.js";

import bcrypt from "bcryptjs";
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

const fetchUnverifiedStudents = async (req, res) => {
    try {

        const unverifiedStudents = await Student.find({ isVerified: false });
        
        if (unverifiedStudents.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students are awaiting verification."
            });
        }

        res.status(200).json({
            success: true,
            message: "Unverified students fetched successfully.",
            students: unverifiedStudents
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching unverified students."
        });
    }
}

const fetchUnverifiedTeachers = async (req, res) => {
    
    try {
        const unverifiedTeachers = await Teacher.find({ isVerified: false });

        if (unverifiedTeachers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No teachers are awaiting verification."
            });
        }

        res.status(200).json({
            success: true,
            message: "Unverified teachers fetched successfully.",
            teachers: unverifiedTeachers
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching unverified teachers."
        });
    }
}

const getAdminProfile = async (req, res) => {
    try {

        const adminId = req.user.userId;

        const admin = await Admin.findById(adminId).select("-password");
        if (!admin) {
            return res.status(404).json({
              success: false,
              message: "Admin not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Admin profile fetched successfully.",
            profile: admin
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching admin profile."
        });
    }
}

const addAdmin = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
              success: false,
              message: "Name, email, and password are required."
            });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
        return res.status(400).json({
            success: false,
            message: "Email is already registered as an admin."
        });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: "admin",  
            isVerified: true 
        });

        await newAdmin.save();
        res.status(201).json({
            success: true,
            message: "New admin added successfully.",
            admin: {
              _id: newAdmin._id,
              name: newAdmin.name,
              email: newAdmin.email,
              role: newAdmin.role
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Server error while adding new admin."
        });
    }
}

const addDoctor = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
              success: false,
              message: "Name, email, and password are required."
            });
        }

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
        return res.status(400).json({
            success: false,
            message: "Email is already registered as a doctor."
        });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDoctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            role: "doctor", 
            isVerified: true  
        });

        await newDoctor.save();

        res.status(201).json({
            success: true,
            message: "New doctor added successfully.",
            doctor: {
              _id: newDoctor._id,
              name: newDoctor.name,
              email: newDoctor.email,
              role: newDoctor.role
            }
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while adding new doctor."
        });
    }
}

const fetchPendingComplaints = async (req, res) => {
    try {
        const pendingComplaints = await AnonymousComplaint.find({ status: "pending" })
            .populate("student", "name registrationNumber");

        res.status(200).json({
            success: true,
            message: "All pending complaints retrieved successfully.",
            data: pendingComplaints
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching pending complaints."
        });
    }
};

const moderateComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { status, moderationRemarks } = req.body;

        const complaint = await AnonymousComplaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ success: false, message: "Complaint not found." });
        }

        complaint.status = status;
        complaint.moderationRemarks = moderationRemarks;
        await complaint.save();

        res.status(200).json({
            success: true,
            message: `Complaint ${status} successfully.`,
            data: complaint
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error while moderating complaint."
        });
    }
}

const rejectComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { moderationRemarks } = req.body;

        const complaint = await AnonymousComplaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ success: false, message: "Complaint not found." });
        }

        if (complaint.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Only pending complaints can be rejected."
            });
        }

        complaint.status = "rejected";
        complaint.moderationRemarks = moderationRemarks;
        await complaint.save();

        res.status(200).json({
            success: true,
            message: "Complaint rejected successfully.",
            data: complaint
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while rejecting complaint."
        });
    }
};

export { verifyStudent, verifyTeacher, fetchUnverifiedStudents, fetchUnverifiedTeachers, getAdminProfile, addAdmin, addDoctor, moderateComplaint, rejectComplaint, fetchPendingComplaints };