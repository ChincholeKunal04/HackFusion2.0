import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["teacher"],
        default: "teacher",
        immutable: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

teacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
         return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;