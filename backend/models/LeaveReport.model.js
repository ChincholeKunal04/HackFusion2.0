import mongoose from "mongoose";

const leaveReportSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isNotified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const LeaveReport = mongoose.model("LeaveReport", leaveReportSchema);
export default LeaveReport;