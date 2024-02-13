"use client";

import { useSelector } from "react-redux";
import FormConfirmation from "./StepForms/FormConfirmation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import TestForm from "./StepForms/TestForm";

export default function TestStepForm() {
  const currentStep = useSelector((store) => store.createTest.currentStep);
  const [email, setEmail] = useState(null);
  function renderFormByStep(step) {
    if (step === 1) {
      return <TestForm />;
    } else if (step === 2) {
      return <FormConfirmation />;
    }
  }
  return <>{renderFormByStep(currentStep)}
    <Toaster />
  </>;
}
