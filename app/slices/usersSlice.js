const { createSlice } = require("@reduxjs/toolkit");

const initialState = { users: [] };
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      const index = state.users.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
  },
});

export const { addUsers, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
