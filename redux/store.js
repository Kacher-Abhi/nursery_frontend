import NurserySlice from "./slices/NurserySlice";
import onboardingCaretakerSlice from "./slices/onboardingCaretakerSlice";
import onboardingPatientSlice from "./slices/onboardingPatientSlice";
import onboardingStudentsSlice from "./slices/onboardingStudentsSlice";

const { configureStore } = require("@reduxjs/toolkit");

//create a store and give it slices
export const store = configureStore({
  reducer: {
    onboarding: onboardingStudentsSlice,
    createCaretaker: onboardingCaretakerSlice,
    createPatinet: onboardingPatientSlice,
    nursery: NurserySlice
  },
});

//Store =whole state
