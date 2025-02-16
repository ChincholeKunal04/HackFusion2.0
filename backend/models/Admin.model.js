import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new Schema({
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
    role: {
        type: String,
        enum: ["admin"],
        default: "admin",
        immutable: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    department: {
        type: String,
        required: false
    }
},
{
    timestamps: true
});

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
         return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;

