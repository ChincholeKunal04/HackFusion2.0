import express from 'express'
import { verifyDoctor } from "../middleware/verifyDoctor.middleware.js"
import { approveHealthReport, fetchAllHealthReports, rejectHealthReport } from "../controller/doctor/doctor.controller.js"

const doctorRouter = express.Router();

doctorRouter.get("/health-reports", verifyDoctor, fetchAllHealthReports);

doctorRouter.put("/approve-health/:reportId", verifyDoctor, approveHealthReport)

doctorRouter.put("/health-report/reject/:reportId", verifyDoctor, rejectHealthReport);

export default doctorRouter