"use client";

import { useSelector } from "react-redux";
import FormConfirmation from "./StepForms/FormConfirmation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import PatientPersonalINfo from "./StepForms/PatientPersonalInfo";

export default function PatientStepForm() {
  const currentStep = useSelector((store) => store.createPatinet.currentStep);

  // const [nursery, setNursery] = useState('nurs29');
  const [email, setEmail] = useState(null);
  function renderFormByStep(step) {
    if (step === 1) {
      return <PatientPersonalINfo setEmail={setEmail}/>;
    }  else if (step === 2) {
      return <FormConfirmation emailSend={email}/>;
    }
  }
  return <>{renderFormByStep(currentStep)}
    <Toaster />
  </>;
}
