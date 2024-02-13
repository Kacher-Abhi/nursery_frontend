// Create a slice

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentStep: 1,
  formData: {},
};
const NotesSlice = createSlice({
  name: "createNotes",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateNotesFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
  },
});
export const { setCurrentStep, updateNotesFormData } = NotesSlice.actions;
export default NotesSlice.reducer;
