"use client";

import { useSelector } from "react-redux";
import FormConfirmation from "./StepForms/FormConfirmation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import CaretakerPersonalInfo from "./StepForms/CaretakerPersonalInfo";
import CaretakerContactInfo from "./StepForms/CaretakerContactInfo";

export default function CaretakerStepForm() {
  const currentStep = useSelector((store) => store.nursery.currentStep);
  const [email, setEmail] = useState(null);
  function renderFormByStep(step) {
    if (step === 1) {
      return <CaretakerPersonalInfo />;
    } else if (step === 2) {
      return <CaretakerContactInfo setEmail={setEmail}/>;
    } else if (step === 3) {
      return <FormConfirmation emailSend={email}/>;
    }
  }
  return <>{renderFormByStep(currentStep)}
    <Toaster />
  </>;
}
