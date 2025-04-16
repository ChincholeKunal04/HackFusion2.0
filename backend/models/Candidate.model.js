import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    position: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"], // Candidate status
        default: "pending",
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election",
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;