import Election from "../../models/Election.model.js"
import Candidate from "../../models/Candidate.model.js"
import Vote from "../../models/Vote.model.js"
import Student from "../../models/Student.model.js"
import transporter from "../../config/emailconfig.js";

const createElection = async (req, res) => {
    try {
        const { title, date, startTime, endTime, positions, rules, candidates } = req.body;

        if (!title || !date || !startTime || !endTime || !positions || !rules) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, date, startTime, endTime, positions, and rules.",
            });
        }

        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time format. Use HH:mm (e.g., 09:00 or 14:30).",
            });
        }

        const newElection = new Election({
            title,
            date: new Date(date), 
            startTime,
            endTime,
            positions,
            rules,
            candidates: [], // Initialize as empty array
        });

        await newElection.save();

        if (candidates && candidates.length > 0) {
            for (const candidateData of candidates) {
                const newCandidate = new Candidate({
                    name: candidateData.name,
                    email: candidateData.email,
                    position: candidateData.position,
                    election: newElection._id, 
                });

                await newCandidate.save();

                newElection.candidates.push(newCandidate._id);
            }

            await newElection.save();
        }

        res.status(201).json({
            success: true,
            message: "Election created successfully.",
            election: newElection,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while creating election.",
        });
    }
}
 
const applyForElection  = async (req, res) => {
    try {
        const { name, email, position, electionId } = req.body;
        //electionId of the specific election
        const studentId = req.user.userId; // Assuming the student's ID is available in the request (from authentication middleware)

        if (!name || !email || !position || !electionId) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email, position, and election ID.",
            });
        }

        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({
                success: false,
                message: "Election not found.",
            });
        }

        const existingCandidate = await Candidate.findOne({
            email,
            election: electionId,
        });
        if (existingCandidate) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this election.",
            });
        }

        const newCandidate = new Candidate({
            name,
            email,
            position,
            election: electionId,
            status: "pending", 
        });

        await newCandidate.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully. Waiting for admin approval.",
            candidate: newCandidate,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while submitting application.",
        });
    }
}

const verifyCandidate = async (req, res) => {
    try {
        const { candidateId, status, remarks } = req.body;

        if (!candidateId || !status || !remarks) {
            return res.status(400).json({
                success: false,
                message: "Please provide candidate ID, status, and remarks.",
            });
        }

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Status must be 'approved' or 'rejected'.",
            });
        }

        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found.",
            });
        }

        if (candidate.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "This candidate's application has already been reviewed.",
            });
        }

        candidate.status = status;
        candidate.remarks = remarks;
        await candidate.save();

         // If approved, add the candidate to the election's candidates array
         if (status === "approved") {
            await Election.findByIdAndUpdate(
                candidate.election,
                { $push: { candidates: candidate._id } }, // Add candidate ID to the election's candidates array
                { new: true }
            );
        }

        res.status(200).json({
            success: true,
            message: `Candidate application ${status} successfully.`,
            candidate,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while verifying candidate.",
        });
    }
}

const fetchAllElections = async (req, res) => {
    try {
        
        const elections = await Election.find()
            .populate({
                path: "candidates",
                select: "name email position status votes",
            })
            .sort({ createdAt: -1 }) 
            .lean(); 

        if (elections.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No elections found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Elections fetched successfully.",
            elections,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching elections.",
        });
    }
};

const fetchAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find()
            .populate({
                path: "election",
                select: "title date startTime endTime", 
            })
            .sort({ createdAt: -1 }) 
            .lean(); 

        if (candidates.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No candidates found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Candidates fetched successfully.",
            candidates,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching candidates.",
        });
    }
}

const getCandidatesForElection = async (req, res) => {
    const { electionId } = req.params;

    try {

        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ 
                success: false,
                message: "Election not found" 
            });
        }

        if (election.status !== "live") {
            return res.status(400).json({ 
                success: false,
                message: "Candidates can only be fetched during the live election period" 
            });
        }

        const candidates = await Candidate.find({ election: electionId }).select(
            "-createdAt -updatedAt -__v"
        );

        res.status(200).json({ 
            success: true,
            electionId: election._id,
            electionTitle: election.title,
            candidates,
            message: "Candidates fetched successfully" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error" 
        });
    }
}

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const initiateVote = async (req, res) => {
    const { studentId, electionId, candidateId } = req.body;

    try {
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ 
                success : false,
                message: "Election not found" 
            });
        }

        if (election.status !== "live") {
            return res.status(400).json({ 
                success : false,
                message: "Voting is only allowed during the live election period" });
        }

        const existingVote = await Vote.findOne({ student: studentId, election: electionId });
        if (existingVote) {
            return res.status(400).json({ 
                success : false,
                message: "You have already voted in this election" 
            });
        }

        const candidate = await Candidate.findOne({ _id: candidateId, election: electionId });
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found in this election" });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const otp = generateOTP();
        student.otp = otp;
        student.otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

        await student.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: "OTP for Voting",
            text: `Your OTP for voting is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            success : true.value,
            otp : otp,
            message : "OTP sent to your email. Please verify to cast your vote." 
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success : false,
            message: "Internal server error while initialize voting"
        });
    }
}

const verifyOtp = async (req, res) => {
    const { studentId, electionId, candidateId, otp } = req.body;

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (student.otp !== otp || new Date() > student.otpExpires) {
            return res.status(400).json({ 
                success : false,
                message: "Invalid or expired OTP" 
            });
        }

        student.otp = null;
        student.otpExpires = null;
        await student.save();

        const vote = new Vote({
            student: studentId,
            candidate: candidateId,
            election: electionId,
        });
        
        await vote.save();

        await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });

        res.status(200).json({ 
            success : true,
            message : "Vote cast successfully" 
        });

    } catch (error) {
        consol.log(error);
        res.status(500).json({ 
            success : false,
            message: "Internal server error" 
        });
    }
}

const calculateElectionResult = async (req, res) => {
    const { electionId } = req.params;

    try {
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ 
                success: false,
                message: "Election not found" 
            });
        }

        if (election.status !== "completed") {
            return res.status(400).json({ 
                success: false,
                message: "Election results can only be calculated after the election ends" 
            });
        }

        const candidates = await Candidate.find({ election: electionId });

        const candidateVotes = await Promise.all(
            candidates.map(async (candidate) => {
                const voteCount = await Vote.countDocuments({ 
                    election: electionId, 
                    candidate: candidate._id 
                });
                return {
                    candidateId: candidate._id,
                    name: candidate.name,
                    position: candidate.position,
                    votes: voteCount,
                };
            })
        );

        const positions = [...new Set(candidates.map(candidate => candidate.position))];
        const electionResult = positions.map(position => {
            const candidatesForPosition = candidateVotes.filter(
                candidate => candidate.position === position
            );

            const maxVotes = Math.max(...candidatesForPosition.map(candidate => candidate.votes));
            const winners = candidatesForPosition.filter(
                candidate => candidate.votes === maxVotes
            );

            return {
                position,
                winners,
                totalVotes: candidatesForPosition.reduce((sum, candidate) => sum + candidate.votes, 0),
            };
        });

        res.status(200).json({ 
            success: true,
            electionId: election._id,
            electionTitle: election.title,
            result: electionResult,
            message: "Election results calculated successfully" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error" 
        });
    }
};

const fetchAllElectionResults = async (req, res) => {
    try {
        const elections = await Election.find();

        const allElectionResults = [];

        for (const election of elections) {

            const candidates = await Candidate.find({ election: election._id });

            const candidateVotes = await Promise.all(
                candidates.map(async (candidate) => {
                    const voteCount = await Vote.countDocuments({
                        election: election._id,
                        candidate: candidate._id,
                    });
                    return {
                        candidateId: candidate._id,
                        name: candidate.name,
                        position: candidate.position,
                        votes: voteCount,
                    };
                })
            );

            const positions = [...new Set(candidates.map(candidate => candidate.position))];
            const electionResult = positions.map(position => {
                const candidatesForPosition = candidateVotes.filter(
                    candidate => candidate.position === position
                );

                const maxVotes = Math.max(...candidatesForPosition.map(candidate => candidate.votes));
                const winners = candidatesForPosition.filter(
                    candidate => candidate.votes === maxVotes
                );

                return {
                    position,
                    winners,
                    totalVotes: candidatesForPosition.reduce((sum, candidate) => sum + candidate.votes, 0),
                };
            });

            allElectionResults.push({
                electionId: election._id,
                electionTitle: election.title,
                result: electionResult,
            });
        }

        res.status(200).json({
            success: true,
            message: "Election results fetched successfully",
            results: allElectionResults,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching election results",
        });
    }
};

export { createElection , applyForElection, verifyCandidate, fetchAllElections, fetchAllCandidates, getCandidatesForElection, initiateVote, verifyOtp, calculateElectionResult, fetchAllElectionResults }