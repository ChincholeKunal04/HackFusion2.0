import mongoose, { Schema } from "mongoose";

const anonymousComplaintSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    complaintText: {
        type: String,
        required: true
    },
    isAnonymous: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    moderationRemarks: {
        type: String,
        default: ""
    },
    boardApprovals: [
        {
            member: { 
                type: mongoose.Schema.Types.ObjectId, 
                refPath: "boardMemberType",
                required : true
            },
            boardMemberType: { 
                type: String, 
                enum: ["Admin", "Teacher"]
            },
            approved: { 
                type: Boolean,
                required : true
            }
        }
    ],
    isIdentityRevealed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

anonymousComplaintSchema.pre("save", function (next) {
    const uniqueVotes = new Map(); 
    
    this.boardApprovals = this.boardApprovals.filter(vote => {
        const uniqueKey = vote.member.toString();
        if (uniqueVotes.has(uniqueKey)) {
            return false;  
        }
        uniqueVotes.set(uniqueKey, true);
        return true;
    });

    next();
});

const AnonymousComplaint = mongoose.model("AnonymousComplaint", anonymousComplaintSchema);
export default AnonymousComplaint;
