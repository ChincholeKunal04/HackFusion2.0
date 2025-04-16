import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
    {
        facilityType: {
            type: String,
            required: true,
            enum: ["ground", "auditorium", "tennis court", "seminar hall", "other"], // Add more types as needed
        },
        purpose: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        remarks: {
            type: String,
            default: "",
        },
        bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "bookedByModel", 
        },
        bookedByModel: {
            type: String,
            required: true,
            enum: ["Student", "Teacher"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Facility = mongoose.model("Facility", facilitySchema);
export default Facility;