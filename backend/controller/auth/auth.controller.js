import Student from "../../models/Student.model.js";
import Admin from "../../models/Admin.model.js";
import Teacher from "../../models/Teacher.model.js"
import Doctor from "../../models/Doctor.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerStudent = async (req, res) => {

    // console.log("Register Route Hit:", req.body);
    // res.status(200).json({ message: "Route is working!" });

    try {
        const { name, registrationNumber, class: studentClass, email, password } = req.body;

        const existingEmail = await Student.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ 
                success: false,
                message: "Email already registered." 
            });
        }

        const existingRegistrationNumber = await Student.findOne({ registrationNumber });   
        if (existingRegistrationNumber) {
            return res.status(400).json({ 
                success: false,
                message: "Registration number already registered." 
            });
        }

        const newStudent = new Student({
            name,
            registrationNumber,
            class: studentClass,
            email,
            password
        });

        await newStudent.save();

        res.status(201).json({ 
            success: true,
            message: "Student registered successfully."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error during registration."
        });
    }
}

const loginStudent = async (req, res) => {
    try {

        const { email, password } = req.body;
        // console.log("Login Request Body:", req.body);

        const student = await Student.findOne({ email });
        // console.log("Student Found:", student);

        if (!student) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials."
            });
        }

        // console.log("Student Verification Status:", student.isVerified);

        if(!student.isVerified) {
            return res.status(403).json({ 
                success: false,
                message: "Account is not verified by admin."
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        // console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials."
            });
        }

        const token = jwt.sign({
            userId : student._id,
            role : student.role
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }); 

        const studentData = {
            _id: student._id,
            email: student.email,
            role: student.role
        };
        
        res.status(200).json({ 
            success: true,
            message: "Student logged in successfully.",
            user : studentData
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error during login."
        });
    }
}

const logoutStudent = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    });

    // console.log("Token Cleared from Cookies");

    res.status(200).json({
        success : true,
        message : "Logout successful",
    })
}

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email or password. 2" 
            });
        }
        
    
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email or password 1 ." 
            });
        }

        const token = jwt.sign({
            userId : admin._id,
            role : admin.role
        }, process.env.JWT_SECRET, { expiresIn: "1h" } )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }); 

        const adminData = {
            _id: admin._id,
            email: admin.email,
            role: admin.role
        };

        res.status(200).json({
            success: true,
            message: "Admin login successful.",
            user : adminData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error during admin login.",
        });
    }
}

const logoutAdmin = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    });

    // console.log("Admin Token Cleared from Cookies"); 

    res.status(200).json({
        success : true,
        message : "Logout successful",
    })
}

const registerTeacher = async (req, res) => {
    try {
        console.log("Teacher Registration Request Received:", req.body);

        const { name, email, password, department } = req.body;

        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }

        const newTeacher = new Teacher({
            name,
            email,
            password,
            department
        });

        await newTeacher.save();

        res.status(201).json({
            success: true,
            message: "Teacher registered successfully.",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error during teacher registration."
        });
    }
}

const loginTeacher = async (req, res) => {
    try {

        const { email, password } = req.body;

        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        if (!teacher.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Account not verified. Please contact admin."
            });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign({
            userId : teacher._id,
            role : teacher.role
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }); 

        const teacherData = {
            _id : teacher._id,
            email : teacher.email,
            role : teacher.role
        }

        res.status(200).json({
            success: true,
            message: "Teacher login successful.",
            user : teacherData
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error during login."
        });
    }
}

const logoutTeacher = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  
        sameSite: "none"
    });

    res.status(200).json({
        success : true,
        message : "Teacher logout successful",
    })
}

const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found."
            });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        const token = jwt.sign({
            userId : doctor._id,
            role : doctor.role
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }); 

        const doctorData = {
            _id : doctor._id,
            email : doctor.email,
            role : doctor.role
        }

        res.status(200).json({
            success: true,
            message: "Doctor logged in successfully.",
            token,
            user : doctorData
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error during login."
        })
    }
}

const logoutDoctor = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  
            sameSite: "none"
        });

        res.status(200).json({
            success: true,
            message: "Doctor logged out successfully."
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error during logout."
        });
    }
}

export { registerStudent, loginStudent, logoutStudent, loginAdmin, logoutAdmin, registerTeacher, loginTeacher, logoutTeacher , loginDoctor, logoutDoctor };