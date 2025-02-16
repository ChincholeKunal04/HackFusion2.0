import express from 'express'
import { getStudentProfile, updateStudentProfile } from '../controller/student/student.controller.js'
import { verifyStudent } from '../middleware/verifyStudent.middleware.js'

const studentRouter = express.Router();

studentRouter.get('/profile', verifyStudent, getStudentProfile);
studentRouter.put("/profile", verifyStudent, updateStudentProfile);

export default studentRouter;