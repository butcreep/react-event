import React, { useState } from "react";
import RoleSelection from "./Steps/RoleSelection";
import CredentialsInput from "./Steps/CredentialsInput";
import LawyerDetails from "./Steps/LawyerDetails";
import CompleteRegistration from "./Steps/CompleteRegistration";

function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleData = newData => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    // Determine the next step based on the user's role and current step
    const nextIndex = currentStep + 1;
    if (formData.role === "lawyer" && currentStep === 1) {
      setCurrentStep(nextIndex); // Go to lawyer-specific form
    } else if (formData.role !== "lawyer" && currentStep === 1) {
      setCurrentStep(3); // Skip lawyer details and go directly to completion
    } else {
      setCurrentStep(nextIndex);
    }
  };

  const steps = [
    <RoleSelection handleData={handleData} nextStep={nextStep} />,
    <CredentialsInput handleData={handleData} nextStep={nextStep} />,
    <LawyerDetails handleData={handleData} nextStep={nextStep} />,
    <CompleteRegistration formData={formData} />,
  ];

  return <div>{steps[currentStep]}</div>;
}

export default SignUpForm;
