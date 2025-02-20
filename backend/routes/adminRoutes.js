import express from 'express';
import { verifyStudent, verifyTeacher, fetchUnverifiedStudents, fetchUnverifiedTeachers, getAdminProfile, addAdmin, addDoctor, fetchPendingComplaints, moderateComplaint, rejectComplaint } from '../controller/admin/admin.controller.js';
import { verifyAdmin } from '../middleware/verifyAdmin.middleware.js';
import { revealIdentityVote } from '../controller/anonymousComplaint/anonymousComplaint.controller.js';
const adminRouter = express.Router();

adminRouter.put('/verify-student/:studentId', verifyAdmin, verifyStudent);
adminRouter.put('/verify-teacher/:teacherId', verifyAdmin, verifyTeacher);

adminRouter.get("/unverified-students", fetchUnverifiedStudents);
adminRouter.get("/unverified-teachers", fetchUnverifiedTeachers);

adminRouter.post('/add', verifyAdmin, addAdmin)

adminRouter.post("/add-doctor", verifyAdmin, addDoctor);

adminRouter.get("/profile", verifyAdmin, getAdminProfile)

adminRouter.get("/pending-complaints", verifyAdmin, fetchPendingComplaints)
adminRouter.put("/moderate-complaint/:complaintId", verifyAdmin, moderateComplaint)
adminRouter.put("/reject-complaint/:complaintId", verifyAdmin, rejectComplaint)
adminRouter.put("/reveal-identity/:complaintId", verifyAdmin, revealIdentityVote);

export default adminRouter;

