"use client";

import { useSelector } from "react-redux";
import FormConfirmation from "./StepForms/FormConfirmation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AdminCreationForm from "./StepForms/AdminCreationForm";
import NurseryCreationForm from "./StepForms/NurseryCreationForm";

export default function StepForm() {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const [nursery, setNursery] = useState('nurs29');
  function renderFormByStep(step) {
    if (step === 2) {
      return <NurseryCreationForm setNursery={setNursery} />;
    } else if (step === 1) {
      return <AdminCreationForm nursery={nursery} />;
    } else if (step === 3) {
      return <FormConfirmation />;
    }
  }
  return <>{renderFormByStep(currentStep)}
    <Toaster />
  </>;
}
