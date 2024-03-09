const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    nurseryId: "",
    username:null,
    userRole: null
};
const CurrentUserSlice = createSlice({
    name: "nursery",
    initialState,
    reducers: {
        setNurseryId: (state, action) => {
            state.nurseryId = action.payload;
        },

        setEmail: (state, action) => {
            state.username = action.email;
        },
    },
});
export const { setEmail, setNurseryId } =
CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
