import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllApprovedHealthReports } from "../../store/teacher/reports";
import Card from "../../components/teacher/ui/Card";
import Input from "../../components/teacher/ui/Input";

const HealthReportList = () => {
  const dispatch = useDispatch();
  const { approvedHealthReports, isLoading, error } = useSelector(
    (state) => state.healtAndLeaveReport
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllApprovedHealthReports());
  }, [dispatch]);

  const filteredReports = approvedHealthReports.filter((report) => {
    const studentName = report?.student?.name?.toLowerCase() || "";
    const sicknessDetails = report?.sicknessDetails?.toLowerCase() || "";
    return (
      studentName.includes(searchTerm.toLowerCase()) ||
      sicknessDetails.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Approved Health Reports</h2>

      <Input
        className="w-full sm:w-80 rounded-full px-4 py-2"
        placeholder="Search by student name or illness"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading && <p className="text-blue-500">Loading health reports...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {filteredReports.length === 0 && !isLoading ? (
        <div className="text-center py-8 text-gray-500">
          No approved health reports found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card
              key={report._id}
              className="transition-all duration-300 hover:shadow-xl rounded-xl border border-gray-200 bg-gradient-to-tr from-white to-slate-50"
            >
              <div className="px-2 space-y-2">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-semibold text-gray-900">
                      {report.student?.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* SICKNESS DETAILS */}
                <div className="text-sm text-gray-700">
                  <strong>Illness:</strong> {report.sicknessDetails}
                </div>

                {/* NOTIFICATION */}
                <div className="text-xs text-gray-500">
                  {report.isNotified
                    ? "Parent notified ✅"
                    : "Parent not notified yet ❌"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthReportList;
