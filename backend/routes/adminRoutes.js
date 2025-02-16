import express from 'express';
import { verifyStudent, verifyTeacher, fetchUnverifiedStudents, fetchUnverifiedTeachers } from '../controller/admin/admin.controller.js';
import { verifyAdmin } from '../middleware/verifyAdmin.middleware.js';

const adminRouter = express.Router();

adminRouter.put('/verify-student/:studentId', verifyAdmin, verifyStudent);
adminRouter.put('/verify-teacher/:teacherId', verifyAdmin, verifyTeacher);

adminRouter.get("/unverified-students", fetchUnverifiedStudents);
adminRouter.get("/unverified-teachers", fetchUnverifiedTeachers);

export default adminRouter;

