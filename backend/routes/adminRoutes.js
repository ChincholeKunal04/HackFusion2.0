import express from 'express';
import { verifyStudent, verifyTeacher, fetchUnverifiedStudents, fetchUnverifiedTeachers, getAdminProfile, addAdmin, addDoctor } from '../controller/admin/admin.controller.js';
import { verifyAdmin } from '../middleware/verifyAdmin.middleware.js';

const adminRouter = express.Router();

adminRouter.put('/verify-student/:studentId', verifyAdmin, verifyStudent);
adminRouter.put('/verify-teacher/:teacherId', verifyAdmin, verifyTeacher);

adminRouter.get("/unverified-students", fetchUnverifiedStudents);
adminRouter.get("/unverified-teachers", fetchUnverifiedTeachers);

adminRouter.post('/add', verifyAdmin, addAdmin)

adminRouter.post("/add-doctor", verifyAdmin, addDoctor);

adminRouter.get("/profile", verifyAdmin, getAdminProfile)

export default adminRouter;

