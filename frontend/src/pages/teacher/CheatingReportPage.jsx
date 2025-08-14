import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheatingRecordForm from "./CheatingForm";
import CheatingRecordList from "./CheatingList";
import { fetchAllCheatingReports, reportCheating } from "../../store/teacher/cheating";

const CheatingReportPage = () => {
  const dispatch = useDispatch();
  const { cheatingReports, isLoading, error } = useSelector((state) => state.cheating);

  useEffect(() => {
    dispatch(fetchAllCheatingReports());
  }, [dispatch]);

  const handleAddRecord = (formValues) => {
    const formData = new FormData();
    formData.append("studentName", formValues.studentName);
    formData.append("date", formValues.date);
    formData.append("description", formValues.description);
    formData.append("type", formValues.type);
    formData.append("evidence", formValues.evidence || "");
    formData.append("actionTaken", formValues.actionTaken);
    formData.append("actionDetails", formValues.actionDetails || "");
    if (formValues.evidenceFiles) {
      Array.from(formValues.evidenceFiles).forEach((file) => {
        formData.append("evidenceFiles", file);
      });
    }
    dispatch(reportCheating(formData));
  };

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold text-gray-900">Cheating Reports</h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">Add New Record</h2>
        <CheatingRecordForm onSubmit={handleAddRecord} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Records</h2>
        <CheatingRecordList records={cheatingReports} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default CheatingReportPage;
