import express from "express";
import { fetchAllLeaveReports, fetchAllApprovedHealthReports } from "../controller/teacher/teacher.controller.js"
import { verifyTeacher } from "../middleware/verifyTeacher.middleware.js";

const teacherRouter = express.Router();

teacherRouter.get("/leave-reports", verifyTeacher, fetchAllLeaveReports);

teacherRouter.get("/approved-health-reports", verifyTeacher, fetchAllApprovedHealthReports);

export default teacherRouter;
