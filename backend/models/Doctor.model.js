import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ["doctor"],   
        default: "doctor",
        immutable: true      
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;