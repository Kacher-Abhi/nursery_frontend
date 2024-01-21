// Create a slice

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentStep: 1,
  formData: {},
};
const onboardingPatientSlice = createSlice({
  name: "createPatent",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updatePatientFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
  },
});
export const { setCurrentStep, updatePatientFormData } =
onboardingPatientSlice.actions;
export default onboardingPatientSlice.reducer;
