import CheatingRecord from "../../models/CheatingRecord.model.js";

const fetchAllCheatingReports = async (req, res) => {
    try {
        const reports = await CheatingRecord.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "All cheating reports retrieved successfully.",
            data: reports
        });

    } catch (error) {
        console.error("Error fetching cheating reports:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching cheating reports."
        });
    }
};

const fetchCheatingReportById = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await CheatingRecord.findById(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Cheating report not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Cheating report retrieved successfully.",
            data: report
        });

    } catch (error) {
        console.error("Error fetching cheating report:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching cheating report."
        });
    }
};

export { fetchAllCheatingReports, fetchCheatingReportById };
