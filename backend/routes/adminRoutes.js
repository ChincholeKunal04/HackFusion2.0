import express from 'express';
import { verifyStudent, verifyTeacher, fetchUnverifiedStudents, fetchUnverifiedTeachers, getAdminProfile, addAdmin, addDoctor, fetchPendingComplaints, moderateComplaint, rejectComplaint } from '../controller/admin/admin.controller.js';
import { verifyAdmin } from '../middleware/verifyAdmin.middleware.js';
import { revealIdentityVote } from '../controller/anonymousComplaint/anonymousComplaint.controller.js';
import { reviewApplication, fetchUnreviewedApplications, fetchSpecificApplication, fetchAllApplications } from '../controller/application/application.controller.js';
// import { reviewFacilityApplication, fetchFacilityApplications, fetchFacilityApplicationById } from '../controller/facility/facility.controller.js';
import { createElection, verifyCandidate, fetchAllElections, fetchAllCandidates, getCandidatesForElection, fetchAllElectionResults, calculateElectionResult } from '../controller/election/election.controller.js';
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

adminRouter.put("/application/:applicationId", verifyAdmin, reviewApplication);
adminRouter.get("/applications", verifyAdmin, fetchUnreviewedApplications);
adminRouter.get("/application/:applicationId", verifyAdmin, fetchSpecificApplication);
adminRouter.get("/all-applications", verifyAdmin, fetchAllApplications);

// adminRouter.put('/review-facility/:applicationId', verifyAdmin, reviewFacilityApplication);
// adminRouter.get("/facility-applications", verifyAdmin, fetchFacilityApplications);
// adminRouter.get("/facility-application/:applicationId", verifyAdmin, fetchFacilityApplicationById)

adminRouter.post("/create-election", verifyAdmin, createElection);
adminRouter.put("/verify-candidate", verifyAdmin, verifyCandidate);
adminRouter.get("/all-elections", verifyAdmin, fetchAllElections);
adminRouter.get("/all-candidates", verifyAdmin, fetchAllCandidates);
adminRouter.get("/election-allcandidates/:electionId", verifyAdmin, getCandidatesForElection)
adminRouter.get("/election-result/:electionId", verifyAdmin, calculateElectionResult);
adminRouter.get("/election-results", verifyAdmin, fetchAllElectionResults)

export default adminRouter;

