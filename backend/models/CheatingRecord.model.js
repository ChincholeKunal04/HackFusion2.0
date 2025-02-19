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
      required: true
    },
    proof: {
      type: String,
      required: true
    },
    complaint: {
      type: String,
      required: true
    }
}, { timestamps: true });

const CheatingRecord = mongoose.model("CheatingRecord", cheatingRecordSchema);
export default CheatingRecord;
