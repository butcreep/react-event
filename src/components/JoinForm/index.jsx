import React, { useState } from "react";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";

const JoinForm = () => {
  const [step, setStep] = useState(1);

  const handleStep1Finish = values => {
    console.log("Step 1 finished:", values);
    setStep(2);
  };

  const handleStep2Finish = values => {
    console.log("Step 2 finished:", values);
    // 서버에 회원가입 데이터 제출 로직을 추가할 수 있습니다.
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="w-[400px] my-auto mx-auto">
      {step === 1 && <Step1Form onFinish={handleStep1Finish} />}
      {step === 2 && <Step2Form onFinish={handleStep2Finish} onPrev={handlePrevStep} />}
    </div>
  );
};

export default JoinForm;
