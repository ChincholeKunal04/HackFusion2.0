import express from 'express'
import { verifyDoctor } from "../middleware/verifyDoctor.middleware.js"
import { approveHealthReport } from "../controller/doctor/doctor.controller.js"

const doctorRoutes = express.Router();

export default doctorRoutes