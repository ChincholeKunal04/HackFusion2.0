import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/index"

import doctorReducer from "./doctor/index"

import reportReducer from "./teacher/reports.js"
import complaintReducer from "./teacher/complaint.js"
import cheatingReducer from "./teacher/cheating.js"

import verifyReducer from "./admin/verifyAccount.js"
import adminComplaintReducer from "./admin/complaints.js"
import adminApplicationReducer from "./admin/applications.js"
import adminElectionReducer from "./admin/election.js"

const store = configureStore({
    reducer : {
        auth : authReducer,

        doctor : doctorReducer,

        healtAndLeaveReport : reportReducer,
        complaintApplication : complaintReducer,
        cheating : cheatingReducer,

        verify : verifyReducer,
        complaints : adminComplaintReducer,
        applications : adminApplicationReducer,
        elections : adminElectionReducer,
        
    },
});

export default store;