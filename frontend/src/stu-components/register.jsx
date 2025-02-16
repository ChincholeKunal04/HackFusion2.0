import React, { useState } from "react";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    email: "",
    password: "",
    rollNo: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.regNo.trim()) newErrors.regNo = "Reg. No. is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be 6+ characters";
    if (!formData.rollNo.trim()) newErrors.rollNo = "Roll No. is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Student Registered Successfully! 🎉");
      setFormData({ name: "", regNo: "", email: "", password: "", rollNo: "" });
      setErrors({});
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚀 Student Registration 🚀</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {["name", "regNo", "email", "password", "rollNo"].map((field, index) => (
          <div key={index} style={styles.inputGroup}>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              style={styles.input}
            />
            {errors[field] && <p style={styles.error}>{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" style={styles.button}>
          Register 🚀
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "25px",
    borderRadius: "15px",
    background: "linear-gradient(to top, #1e3c72, #2a5298)",
    boxShadow: "0 0 15px rgba(255, 69, 0, 0.7)", // Glowing border effect
    border: "4px solid transparent",
    borderImage: "linear-gradient(to right, #ff416c, #ff4b2b) 1",
    textAlign: "center",
    position: "relative",
    color: "#fff",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
    textShadow: "2px 2px 10px rgba(255,255,255,0.8)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    outline: "none",
    background: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    transition: "0.3s",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
  },
  inputFocus: {
    background: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
  },
  button: {
    padding: "12px",
    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.4s",
    boxShadow: "0 0 10px rgba(255, 69, 0, 0.8)", // Glowing button effect
  },
  buttonHover: {
    background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
    boxShadow: "0 0 20px rgb(29, 16, 11)",
  },
  error: {
    color: "yellow",
    fontSize: "12px",
    marginTop: "5px",
  },
};

export default StudentRegister;
