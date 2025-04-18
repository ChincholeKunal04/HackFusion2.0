import express from 'express'
import { getStudentProfile, updateStudentProfile, reportSickness, reportLeave, fetchAllHealthReports, fetchHealthReportStatus, fetchAllLeaveReports, submitComplaint } from '../controller/student/student.controller.js';
import { fetchAllCheatingReports, fetchCheatingReportById } from '../controller/cheating/cheating.controller.js';
import { verifyStudent } from '../middleware/verifyStudent.middleware.js';
import { fetchAllComplaints, fetchSpecificComplaint } from '../controller/anonymousComplaint/anonymousComplaint.controller.js';
import { submitApplication, fetchSpecificApplication, fetchAllApplications } from '../controller/application/application.controller.js';
// import { bookFacility, fetchFacilityApplications, fetchFacilityApplicationById } from '../controller/facility/facility.controller.js';
import { applyForElection, initiateVote, verifyOtp, calculateElectionResult, fetchAllElectionResults, fetchAllElections, fetchAllCandidates, getCandidatesForElection } from '../controller/election/election.controller.js';
import upload from '../middleware/imageUpload.middleware.js';

const studentRouter = express.Router();

studentRouter.get('/profile', verifyStudent, getStudentProfile);
studentRouter.put("/profile", verifyStudent, updateStudentProfile);

studentRouter.post("/report-sickness",verifyStudent, reportSickness);
studentRouter.get("/health-reports", verifyStudent, fetchAllHealthReports);
studentRouter.get("/health-report/:reportId", verifyStudent, fetchHealthReportStatus);

studentRouter.post("/report-leave", verifyStudent, reportLeave)
studentRouter.get("/leave-reports", verifyStudent, fetchAllLeaveReports);

studentRouter.get("/cheating-reports", verifyStudent, fetchAllCheatingReports);
studentRouter.get("/cheating-reports/:reportId", verifyStudent, fetchCheatingReportById);

studentRouter.post("/complaint", verifyStudent, submitComplaint);
studentRouter.get("/complaints", verifyStudent, fetchAllComplaints);
studentRouter.get("/complaints/:complaintId", verifyStudent, fetchSpecificComplaint);

studentRouter.post("/apply-application", verifyStudent, upload.array("files", 5), submitApplication);
studentRouter.get("/applications", verifyStudent, fetchAllApplications);
studentRouter.get("/application/:applicationId", verifyStudent, fetchSpecificApplication);

// studentRouter.post("/book-facility", verifyStudent, bookFacility);
// studentRouter.get("/facility-applications", verifyStudent, fetchFacilityApplications);
// studentRouter.get("/facility-application/:applicationId", verifyStudent, fetchFacilityApplicationById)

studentRouter.post("/apply-election", verifyStudent, applyForElection);
studentRouter.post("/vote", verifyStudent, initiateVote);
studentRouter.post("/verifyt-otp", verifyStudent, verifyOtp);
studentRouter.get("/all-elections", verifyStudent, fetchAllElections);
studentRouter.get("/all-candidates", verifyStudent, fetchAllCandidates);
studentRouter.get("/election-allcandidates/:electionId", verifyStudent, getCandidatesForElection)
studentRouter.get("/election-result/:electionId", verifyStudent, calculateElectionResult);
studentRouter.get("/election-results", verifyStudent, fetchAllElectionResults)

export default studentRouter;