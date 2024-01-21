// Create a slice

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentStep: 1,
  formData: {},
};
const onboardingCaretakerSlice = createSlice({
  name: "createCaretaker",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateCaretakerFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
  },
});
export const { setCurrentStep, updateCaretakerFormData } =
onboardingCaretakerSlice.actions;
export default onboardingCaretakerSlice.reducer;
