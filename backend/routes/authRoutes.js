import express from 'express';
import { registerStudent, loginStudent, logoutStudent, loginAdmin, logoutAdmin, registerTeacher, loginTeacher, logoutTeacher, loginDoctor, logoutDoctor } from '../controller/auth/auth.controller.js';

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


export default authRouter;