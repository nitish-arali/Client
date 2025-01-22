import { createSlice } from "@reduxjs/toolkit";

const UserContext = createSlice({
  name: "UserContext",
  initialState: {
    value: {},
  },
  reducers: {
    updateUserContext: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateUserContext } = UserContext.actions;

export default UserContext.reducer;
