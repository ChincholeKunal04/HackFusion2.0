import express from "express";
import { fetchAllLeaveReports, fetchAllApprovedHealthReports, reportCheating } from "../controller/teacher/teacher.controller.js"
import { verifyTeacher } from "../middleware/verifyTeacher.middleware.js";
import { fetchAllCheatingReports, fetchCheatingReportById } from "../controller/cheating/cheating.controller.js";
import { revealIdentityVote, fetchAllComplaints, fetchSpecificComplaint } from "../controller/anonymousComplaint/anonymousComplaint.controller.js";
import upload from "../middleware/imageUpload.middleware.js";

const teacherRouter = express.Router();

teacherRouter.get("/leave-reports", verifyTeacher, fetchAllLeaveReports);

teacherRouter.get("/approved-health-reports", verifyTeacher, fetchAllApprovedHealthReports);

teacherRouter.post("/report-cheating", verifyTeacher, upload.single("proof"), reportCheating);

teacherRouter.get("/cheating-reports", verifyTeacher, fetchAllCheatingReports);
teacherRouter.get("/cheating-reports/:reportId", verifyTeacher, fetchCheatingReportById);

teacherRouter.put("/reveal-identity/:complaintId", verifyTeacher, revealIdentityVote)
teacherRouter.get("/complaints", verifyTeacher, fetchAllComplaints)
teacherRouter.get("/complaint/:complaintId", verifyTeacher, fetchSpecificComplaint)

export default teacherRouter;
