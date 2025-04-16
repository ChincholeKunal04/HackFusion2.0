import AnonymousComplaint from "../../models/AnonymousComplaint.model.js";
import Admin from "../../models/Admin.model.js";
import Teacher from "../../models/Teacher.model.js";

const revealIdentityVote = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const boardMemberId = req.user.userId;
        let boardMemberType = req.user.role;

        if (boardMemberType !== "admin" && boardMemberType !== "teacher") {
            return res.status(403).json({
                success: false,
                message: "Only board members (admins and teachers) can vote."
            });
        }

        boardMemberType = boardMemberType === "admin" ? "Admin" : "Teacher";

        const complaint = await AnonymousComplaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ 
                success: false, 
                message: "Complaint not found." 
            });
        }

        if (!complaint.type) {
            return res.status(400).json({
                success: false,
                message: "Complaint type is required."
            });
        }

        const alreadyVoted = complaint.boardApprovals.some(vote => 
            vote.member.toString() === boardMemberId
        );
        if (alreadyVoted) {
            return res.status(400).json({
                success: false,
                message: "You have already voted on this complaint."
            });
        }

        complaint.boardApprovals.push({
            member: boardMemberId,
            boardMemberType: boardMemberType,
            approved: true
        });

        complaint.boardApprovals = complaint.boardApprovals.filter((vote, index, self) =>
            index === self.findIndex(v => v.member.toString() === vote.member.toString())
        );

        const totalAdmins = await Admin.countDocuments();
        const totalVerifiedTeachers = await Teacher.countDocuments({ isVerified: true });
        const totalBoardMembers = totalAdmins + totalVerifiedTeachers;

        const approvals = complaint.boardApprovals.filter(vote => vote.approved).length;

        console.log("Total Board Members:", totalBoardMembers);
        console.log("Total Approvals:", approvals);

        if (approvals / totalBoardMembers > 0.5) {
            complaint.isIdentityRevealed = true;
            complaint.isAnonymous = false;
        }

        await complaint.save();

        res.status(200).json({
            success: true,
            message: "Vote registered successfully.",
            data: complaint
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error while voting for identity reveal."
        });
    }
};

const fetchSpecificComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const complaint = await AnonymousComplaint.findById(complaintId).populate("student", "name registrationNumber");

        if (!complaint) {
            return res.status(404).json({ success: false, message: "Complaint not found." });
        }

        let responseComplaint = {
            _id: complaint._id,
            complaintText: complaint.complaintText,
            status: complaint.status,
            moderationRemarks: complaint.moderationRemarks,
            createdAt: complaint.createdAt,
            updatedAt: complaint.updatedAt
        };

        if (complaint.isIdentityRevealed) {
            responseComplaint.isAnonymous = false;
            responseComplaint.student = {
                name: complaint.student.name,
                registrationNumber: complaint.student.registrationNumber
            };
        } else {
            responseComplaint.isAnonymous = true; 
            responseComplaint.student = "Anonymous";
        }

        res.status(200).json({
            success: true,
            message: "Complaint retrieved successfully.",
            data: responseComplaint
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching complaint."
        });
    }
};

const fetchAllComplaints = async (req, res) => {
    try {
        const complaints = await AnonymousComplaint.find({ status: "approved" })
            .populate("student", "name registrationNumber");

        const formattedComplaints = complaints.map(complaint => ({
            _id: complaint._id,
            complaintText: complaint.complaintText,
            status: complaint.status,
            moderationRemarks: complaint.moderationRemarks,
            createdAt: complaint.createdAt,
            updatedAt: complaint.updatedAt,
            isAnonymous: !complaint.isIdentityRevealed,
            student: {
                name: complaint.isIdentityRevealed ? complaint.student.name : "Anonymous",
                registrationNumber: complaint.isIdentityRevealed ? complaint.student.registrationNumber : "N/A"
            }
        }));

        res.status(200).json({
            success: true,
            message: "All approved complaints retrieved successfully.",
            data: formattedComplaints
        });

    } catch (error) {
        console.error("Error fetching all complaints:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching complaints."
        });
    }
};

export { revealIdentityVote, fetchSpecificComplaint, fetchAllComplaints }