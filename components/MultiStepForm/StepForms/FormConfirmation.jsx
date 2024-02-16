import NavButtons from "@/components/FormInputs/NavButtons";
import { ChevronRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentStep } from "@/redux/slices/NurserySlice";
import { updateFormData } from "@/redux/slices/onboardingStudentsSlice";
import { updatePatientFormData } from "@/redux/slices/onboardingPatientSlice";
import { updateCaretakerFormData } from "@/redux/slices/onboardingCaretakerSlice";

export default function FormConfirmation({ emailSend }) {
  const formData = useSelector((store) => store.onboarding.formData);

  const dispatch = useDispatch();
  async function processData(data) {
    dispatch(updateCurrentStep(1));
    dispatch(updateFormData({}));
    dispatch(updatePatientFormData({}));
    dispatch(updateCaretakerFormData({}));
    await fetch('/api/email/send', { method: "POST", body: JSON.stringify({email : "abhishekbkacher@gmail.com"}) });

    console.log(formData);
  }

  return (
    <div>
      {emailSend != null ? (
        <>
          <form className="px-12 py-4" onSubmit={processData}>
            <div className="mb-8">
              <h5 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Submited Data
              </h5>
              <p>Your form has been successfully submitted</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div>Email will be sent to {emailSend}</div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <span>Confirm and Submit</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        </>
      ) : (
        <>
          <form className="px-12 py-4" onSubmit={processData}>
            <div className="mb-8">
              <h5 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Submited Data
              </h5>
              <p>Your form has been successfully submitted</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <code>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
              </code>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <a href="/">
                <span>Confirm and Submit</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </button>
          </form>
        </>
      )}
    </div>
  );
}
