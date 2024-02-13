import CurrentUserSlice from "./slices/CurrentUserSlice";
import NotesSlice from "./slices/NotesSlice";
import NurserySlice from "./slices/NurserySlice";
import TestSlice from "./slices/TestSlice";
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
    nursery: NurserySlice,
    currentUser: CurrentUserSlice,
    createTest: TestSlice,
    createNotes: NotesSlice
  },
});

//Store =whole state
