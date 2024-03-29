import StepForm from "@/components/MultiStepForm/StepForm";
import Steps from "@/components/MultiStepForm/Steps";
import ProtectedPage from "@/components/application/protectedPage";
import React from "react";

export default function StudentOnboardingPage() {
  const steps = [
    {
      number: 1,
      title: "Nursery Info",
    },
    {
      number: 2,
      title: "Admin Info",
    },
    {
      number: 3,
      title: "Submit and Confirmation",
    },
  ];
  return (
    <ProtectedPage allowedRoles={['ROLE_SUPER_ADMIN']}>
    <div className="bg-blue-50 min-h-screen p-4">
      <div className="mx-auto w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 md:p-6 dark:bg-gray-800 dark:border-gray-700 grid grid-cols-12 gap-4 min-h-screen">
        {/* Steps */}
        <Steps steps={steps} />
        {/* Form */}
        <div className="rounded-lg col-span-full md:col-span-8">
          <StepForm />
        </div>
      </div>
    </div>
    </ProtectedPage>
  );
}
