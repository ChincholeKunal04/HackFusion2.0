import express from 'express'
import { getStudentProfile, updateStudentProfile, reportSickness, reportLeave, fetchAllHealthReports, fetchHealthReportStatus, fetchAllLeaveReports } from '../controller/student/student.controller.js'
import { verifyStudent } from '../middleware/verifyStudent.middleware.js'

const studentRouter = express.Router();

studentRouter.get('/profile', verifyStudent, getStudentProfile);
studentRouter.put("/profile", verifyStudent, updateStudentProfile);

studentRouter.post("/report-sickness",verifyStudent, reportSickness);
studentRouter.get("/health-reports", verifyStudent, fetchAllHealthReports);
studentRouter.get("/health-report/:reportId", verifyStudent, fetchHealthReportStatus);

studentRouter.post("/report-leave", verifyStudent, reportLeave)
studentRouter.get("/leave-reports", verifyStudent, fetchAllLeaveReports);

export default studentRouter;