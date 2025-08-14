import mongoose, { Schema } from "mongoose";

const cheatingRecordSchema = new Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    registrationNumber: {
      type: String,
      required: true
    },
    reason: {
      type: String,
      required: false
    },
    proof: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    actionTaken: {
      type: String,
      enum: ["warning", "marks deducted", "suspended", "expelled", "other"],
      default: "warning"
    },
    actionDetails: {
      type: String,
      default: ""
    }
}, { timestamps: true });

const CheatingRecord = mongoose.model("CheatingRecord", cheatingRecordSchema);
export default CheatingRecord;
