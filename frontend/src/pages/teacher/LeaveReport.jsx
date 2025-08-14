import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLeaveReports } from "../../store/teacher/reports";
import Card from "../../components/teacher/ui/Card";
import Input from "../../components/teacher/ui/Input";
import Button from "../../components/teacher/ui/Button";

const LeaveReportList = () => {
  const dispatch = useDispatch();
  const { leaveReports, isLoading, error } = useSelector(
    (state) => state.healtAndLeaveReport
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllLeaveReports());
  }, [dispatch]);

  const filteredReports = leaveReports.filter((report) => {
    const studentName = report?.student?.name?.toLowerCase() || "";
    return studentName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Leave Reports</h2>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          className="w-full sm:w-64 rounded-full px-4 py-2"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && <p className="text-blue-500">Loading leave reports...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {filteredReports.length === 0 && !isLoading ? (
        <div className="text-center py-8 text-gray-500">
          No leave reports found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report._id}>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-semibold text-gray-900">
                      {report.student?.name || "Unknown Student"}
                      <span className="ml-2 text-xs text-gray-500">
                        ({report.student?.registrationNumber})
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Reason:</strong> {report.reason}
                </div>
                {report.fromDate && report.toDate && (
                  <div className="text-sm text-gray-700">
                    <strong>Dates:</strong> {report.fromDate} to {report.toDate}
                  </div>
                )}
                {report.remarks && (
                  <div className="text-sm text-gray-700">
                    <strong>Remarks:</strong> {report.remarks}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveReportList;
