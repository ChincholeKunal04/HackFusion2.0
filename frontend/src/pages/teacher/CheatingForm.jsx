import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { reportCheating } from "../../store/teacher/cheating";
import Button from "../../components/teacher/ui/Button";
import Input from "../../components/teacher/ui/Input";
import Select from "../../components/teacher/ui/Select";
import Textarea from "../../components/teacher/ui/Textarea";

const cheatingTypes = [
  { value: "plagiarism", label: "Plagiarism" },
  { value: "exam misconduct", label: "Exam Misconduct" },
  { value: "unauthorized collaboration", label: "Unauthorized Collaboration" },
  { value: "impersonation", label: "Impersonation" },
  { value: "other", label: "Other" },
];

const actionOptions = [
  { value: "warning", label: "Warning" },
  { value: "marks deducted", label: "Marks Deducted" },
  { value: "suspended", label: "Suspended" },
  { value: "expelled", label: "Expelled" },
  { value: "other", label: "Other" },
];

const CheatingRecordForm = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    registrationNumber: "",
    course: "",
    reason: "plagiarism",
    actionTaken: "warning",
    actionDetails: "",
    evidenceFiles: null,
    additionalNotes: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formValues.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required";
    if (!formValues.course.trim()) newErrors.course = "Course is required";
    if (!formValues.reason.trim()) newErrors.reason = "Reason is required";
    if (!formValues.actionTaken.trim()) newErrors.actionTaken = "Action taken is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("registrationNumber", formValues.registrationNumber);
    formData.append("course", formValues.course);
    formData.append("reason", formValues.reason);
    formData.append("actionTaken", formValues.actionTaken);
    formData.append("actionDetails", formValues.actionDetails);
    formData.append("additionalNotes", formValues.additionalNotes);

    if (formValues.evidenceFiles && formValues.evidenceFiles[0]) {
      formData.append("proof", formValues.evidenceFiles[0]);
    }

    dispatch(reportCheating(formData));

    setFormValues({
      registrationNumber: "",
      course: "",
      reason: "plagiarism",
      actionTaken: "warning",
      actionDetails: "",
      evidenceFiles: null,
      additionalNotes: "",
    });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow-md rounded-xl p-6 text-gray-800"
    >
      <h2 className="text-xl font-semibold text-gray-900">Report Cheating Incident</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Student Registration Number"
          value={formValues.registrationNumber}
          onChange={(e) => handleChange("registrationNumber", e.target.value)}
          error={errors.registrationNumber}
          required
        />
        <Input
          label="Course"
          value={formValues.course}
          onChange={(e) => handleChange("course", e.target.value)}
          error={errors.course}
          required
        />
      </div>

      <Select
        label="Type of Cheating"
        options={cheatingTypes}
        value={formValues.reason}
        onChange={(e) => handleChange("reason", e.target.value)}
      />

      <Select
        label="Action Taken"
        options={actionOptions}
        value={formValues.actionTaken}
        onChange={(e) => handleChange("actionTaken", e.target.value)}
      />

      <Textarea
        label="Action Details"
        value={formValues.actionDetails}
        onChange={(e) => handleChange("actionDetails", e.target.value)}
        placeholder="For example, suspended for 1 semester or warned by examination committee"
        rows={3}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium">Upload Evidence (Image/PDF)</label>
        <Input
          type="file"
          onChange={(e) => handleChange("evidenceFiles", e.target.files)}
          accept="image/*,.pdf"
        />
        <p className="text-xs text-gray-500">Attach any relevant supporting proof.</p>
      </div>

      <Textarea
        label="Additional Notes (optional)"
        value={formValues.additionalNotes}
        onChange={(e) => handleChange("additionalNotes", e.target.value)}
        placeholder="Any extra remarks about this case"
        rows={3}
      />

      <div className="pt-4">
        <Button type="submit" variant="primary">
          Submit Record
        </Button>
      </div>
    </form>
  );
};

export default CheatingRecordForm;
