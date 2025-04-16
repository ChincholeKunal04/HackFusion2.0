import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index"
import doctorReducer from "./doctor/index"
import reportReducer from "./teacher/reports.js"
import complaintReducer from "./teacher/complaint.js"
import cheatingReducer from "./teacher/cheating.js"

const store = configureStore({
    reducer : {
        auth : authReducer,
        doctor : doctorReducer,
        healtAndLeaveReport : reportReducer,
        complaintApplication : complaintReducer,
        cheating : cheatingReducer,
    },
});

export default store;