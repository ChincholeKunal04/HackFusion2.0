import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        required: true,
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

voteSchema.index({ student: 1, election: 1 }, { unique: true });

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;