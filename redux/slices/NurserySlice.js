// Create a slice

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    nurseryId: "nurse1",
    currentStep: 1
};
const NurserySlice = createSlice({
    name: "nursery",
    initialState,
    reducers: {
        setNurseryId: (state, action) => {
            state.nurseryId = action.payload;
        },

        updateCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
    },
});
export const { updateCurrentStep, setNurseryId } =
    NurserySlice.actions;
export default NurserySlice.reducer;
