// Create a slice

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentStep: 1,
  formData: {},
};
const TestSlice = createSlice({
  name: "createTest",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateTestFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
  },
});
export const { setCurrentStep, updateTestFormData } = TestSlice.actions;
export default TestSlice.reducer;
