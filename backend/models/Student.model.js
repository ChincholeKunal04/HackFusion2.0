import mongoose , { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    class: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{4}[a-z]{3}[0-9]{3}@sggs\.ac\.in$/,
        validate: {
            validator: function (v) {
                return /^[0-9]{4}[a-z]{3}[0-9]{3}@sggs\.ac\.in$/.test(v);
            },
            message: props => `${props.value} is not a valid college email!`
        }
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ["student"],   
        default: "student",
        immutable: true      
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpires: {
        type: Date,
        default: null,
    },
    parentEmail: {
        type: String,
        // required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    parentPhone: {
        type: String,
        // required: true,
        match: /^[0-9]{10}$/
    },
    classCoordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
},
{timestamps: true}
);

studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
         return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Student = mongoose.model('Student', studentSchema);
export default Student;

