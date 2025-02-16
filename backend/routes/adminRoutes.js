import express from 'express';
import { verifyStudent, verifyTeacher } from '../controller/admin/admin.controller.js';
import { verifyAdmin } from '../middleware/verifyAdmin.middleware.js';

const adminRouter = express.Router();

adminRouter.put('/verify-student/:studentId', verifyAdmin, verifyStudent);
adminRouter.put('/verify-teacher/:teacherId', verifyAdmin, verifyTeacher);


export default adminRouter;

