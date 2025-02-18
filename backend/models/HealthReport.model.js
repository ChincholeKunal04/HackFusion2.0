import mongoose from "mongoose";

const healthReportSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  sicknessDetails: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
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

const HealthReport = mongoose.model("HealthReport", healthReportSchema);
export default HealthReport;
