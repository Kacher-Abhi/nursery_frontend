"use client";

import { useSelector } from "react-redux";
import FormConfirmation from "./StepForms/FormConfirmation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import NotesForm from "./StepForms/NotesForm";

export default function NotesStepForm() {
  const currentStep = useSelector((store) => store.createNotes.currentStep);
  const [email, setEmail] = useState(null);
  function renderFormByStep(step) {
    if (step === 1) {
      return <NotesForm />;
    } else if (step === 2) {
      return <FormConfirmation />;
    }
  }
  return <>{renderFormByStep(currentStep)}
    <Toaster />
  </>;
}
