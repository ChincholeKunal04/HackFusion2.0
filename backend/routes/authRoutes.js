import express from 'express';
import { registerStudent, loginStudent, logoutStudent, loginAdmin, logoutAdmin, registerTeacher, loginTeacher, logoutTeacher, loginDoctor, logoutDoctor } from '../controller/auth/auth.controller.js';
import { verifyStudent } from "../middleware/verifyStudent.middleware.js"
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js"
const authRouter = express.Router();

authRouter.post('/register', registerStudent);
authRouter.post('/login', loginStudent);
authRouter.post('/logout', logoutStudent)

authRouter.post('/teacher-register', registerTeacher);
authRouter.post('/teacher-login', loginTeacher);
authRouter.post('/teacher-logout', logoutTeacher);

authRouter.post('/admin-login',loginAdmin);
authRouter.post('/admin-logout',logoutAdmin);

authRouter.post('/doctor-login', loginDoctor)
authRouter.post('/doctor-logout', logoutDoctor)


authRouter.get('/check-auth-student', verifyStudent, (req, res) => {
        const user = req.user;
        res.status(200).json({
            success : true,
            message : "User is Authenticated",
            user
        });
    }
)
authRouter.get('/check-auth-teacher', verifyAdmin, (req, res) => {
        const user = req.user;
        res.status(200).json({
            success : true,
            message : "User is Authenticated",
            user
        });
    }
)

export default authRouter;