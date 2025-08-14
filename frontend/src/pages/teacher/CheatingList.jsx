import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCheatingReports } from "../../store/teacher/cheating";

import Button from "../../components/teacher/ui/Button";
import Input from "../../components/teacher/ui/Input";
import Select from "../../components/teacher/ui/Select";
import Card from "../../components/teacher/ui/Card";

const CheatingRecordList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cheatingReports, isLoading, error } = useSelector((state) => state.cheating);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [expandedRecord, setExpandedRecord] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCheatingReports());
  }, [dispatch]);

  const typeOptions = [
    { value: "", label: "All Types" },
    { value: "plagiarism", label: "Plagiarism" },
    { value: "exam misconduct", label: "Exam Misconduct" },
    { value: "unauthorized collaboration", label: "Unauthorized Collaboration" },
    { value: "impersonation", label: "Impersonation" },
    { value: "other", label: "Other" },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case "plagiarism":
        return "bg-red-100 text-red-800 border-red-200";
      case "exam misconduct":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "unauthorized collaboration":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "impersonation":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredRecords = cheatingReports.filter((record) => {
    const name = record?.name?.toLowerCase() || "";
    const reason = record?.reason?.toLowerCase() || "";
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      reason.includes(searchTerm.toLowerCase());
    const matchesType = filterType ? record.reason === filterType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          className="flex-1"
          placeholder="Search by student name or reason"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          className="w-full sm:w-48"
          options={typeOptions}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        />
      </div>

      {isLoading && <p className="text-blue-500">Loading records...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {filteredRecords.length === 0 && !isLoading ? (
        <div className="text-center py-8 text-gray-500">No cheating records found.</div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <Card key={record._id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{record.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">
                      {new Date(record.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(record.reason)}`}
                    >
                      {record.reason}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setExpandedRecord(expandedRecord === record._id ? null : record._id)
                    }
                  >
                    {expandedRecord === record._id ? "Hide Details" : "View Details"}
                  </Button>
                </div>
              </div>

              {expandedRecord === record._id && (
                <div className="border-t border-gray-200 p-4 bg-white-50 space-y-4">
                  {record.course && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Course</h4>
                      <p className="mt-1 text-sm text-gray-600">{record.course}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Reason</h4>
                    <p className="mt-1 text-sm text-gray-600">{record.reason}</p>
                  </div>
                  {record.proof && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Proof</h4>
                      <a
                        href={record.proof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        View Proof
                      </a>
                    </div>
                  )}
                   {record.actionTaken && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Action Taken</h4>
                      <p className="mt-1 text-sm text-gray-600">{record.actionTaken}</p>
                    </div>
                  )}
                  {record.actionDetails && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Action Details</h4>
                      <p className="mt-1 text-sm text-gray-600">{record.actionDetails}</p>
                    </div>
                  )}
  
                </div>
              )}
              
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheatingRecordList;
