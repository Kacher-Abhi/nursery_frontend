const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    nurseryId: "",
    email:""
};
const CurrentUserSlice = createSlice({
    name: "nursery",
    initialState,
    reducers: {
        setNurseryId: (state, action) => {
            state.nurseryId = action.payload;
        },

        setEmail: (state, action) => {
            state.email = action.email;
        },
    },
});
export const { setEmail, setNurseryId } =
CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
