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
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.startDate; // Ensure endDate is not before startDate
      },
      message: "End date must be after or equal to the start date."
    }
  },
  isNotified: {
    type: Boolean,
    default: false
  },
  
}, { timestamps: true });

const LeaveReport = mongoose.model("LeaveReport", leaveReportSchema);
export default LeaveReport;