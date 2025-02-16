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
    votedCandidates: [
        {
          electionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Election"
          },
          candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate"
          }
        }
    ],
    isCandidate: {
        type: Boolean,
        default: false
    },
  
    manifesto: {
        type: String,
        required: function () {
          return this.isCandidate;
        }
    },
  
    position: {
        type: String,
        required: function () {
          return this.isCandidate;
        }
    },
    bookings: [
        {
          facilityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Facility"
          },
          date: Date,
          status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
          }
        }
    ],
    applications: [
        {
          applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application"
          },
          status: {
            type: String,
            enum: ["submitted", "approved", "rejected", "escalated"],
            default: "submitted"
          }
        }
    ],
    complaints: [
        {
          complaintId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint"
          },
          isAnonymous: {
            type: Boolean,
            default: true
          },
          status: {
            type: String,
            enum: ["pending", "reviewed", "resolved"],
            default: "pending"
          }
        }
    ],
    // budgetRequests: [
    //     {
    //       budgetId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Budget"
    //       },
    //       status: {
    //         type: String,
    //         enum: ["pending", "approved", "rejected"],
    //         default: "pending"
    //       }
    //     }
    // ]
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

