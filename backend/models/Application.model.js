import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    applicant: { 
        type: mongoose.Schema.Types.ObjectId, 
        refPath: "applicantType",
        required: true
    },
    applicantType: {
        type: String,
        enum: ["Student", "Teacher"], 
        required: true
    },
    type: { 
        type: String, 
        enum: ["Event", "Budget", "Sponsorship"], 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    attachments: [{ 
        type: String 
    }],
    estimatedCost: { 
        type: Number, 
        required: function() { return this.type === "Budget"; } 
    },
    proposedDate: { 
        type: Date,
        required: function() { return this.type === "Event"; } 
    },
    status: { 
        type: String, 
        enum: ["Pending", "In Review", "Approved", "Rejected", "Escalated"], 
        default: "Pending" 
    },
    adminRemark: {
        type: String, // 🔹 Stores remarks for approval or rejection
        default: null
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Admin",
        default: null 
    },
    escalationCount: { 
        type: Number, 
        default: 0 
    },
    lastEscalationDate: { 
        type: Date, 
        default: Date.now 
    },
}, { timestamps : true } )

const Application = mongoose.model("Application", applicationSchema);
export default Application;