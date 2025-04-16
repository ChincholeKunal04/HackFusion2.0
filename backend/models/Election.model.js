import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date, 
        required: true,
    },
    startTime: {
        type: String, 
        required: true,
        validate: {
            validator: function (value) {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
            },
            message: "Invalid time format. Use HH:mm (e.g., 09:00 or 14:30).",
        },
    },
    endTime: {
        type: String, 
        required: true,
        validate: {
            validator: function (value) {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
            },
            message: "Invalid time format. Use HH:mm (e.g., 17:00 or 20:30).",
        },
    },
    positions: [{
        type: String,
        required: true,
    }],
    rules: {
        type: String,
        required: true,
    },
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate", 
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

electionSchema.virtual("status").get(function () {
    const now = new Date();
    const electionDate = this.date; 
    const startTime = this.startTime; 
    const endTime = this.endTime; 

    // Combine election date with start and end times
    const startDateTime = new Date(
        `${electionDate.toISOString().split("T")[0]}T${startTime}:00.000Z`
    );
    const endDateTime = new Date(
        `${electionDate.toISOString().split("T")[0]}T${endTime}:00.000Z`
    );

    // Determine the status based on the current time
    if (now < startDateTime) {
        return "upcoming"; // Election is in the future
    } else if (now >= startDateTime && now <= endDateTime) {
        return "live"; // Election is currently ongoing
    } else {
        return "completed"; // Election has ended
    }
});

electionSchema.set("toJSON", { virtuals: true });
electionSchema.set("toObject", { virtuals: true });

const Election = mongoose.model("Election", electionSchema);
export default Election;
