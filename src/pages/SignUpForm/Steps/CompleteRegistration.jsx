import React from "react";
import axios from "axios";
import { Button } from "antd";

function CompleteRegistration({ formData }) {
  const handleSubmit = async () => {
    console.log("Final form data:", formData);
    try {
      // json-server로 데이터 보내기
      const response = await axios.post("http://localhost:3001/users", formData);
      console.log("Saved data", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div>
      <h1>Complete Your Registration</h1>
      <Button type="primary" onClick={handleSubmit}>
        Submit Registration
      </Button>
    </div>
  );
}

export default CompleteRegistration;
