import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/jsonplaceholder";

export const fetchUsers = createAsyncThunk("users/fetchUsers", api.getUsers);

const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], selectedId: null, loading: false },
  reducers: {
    selectUser: (state, action) => {
      state.selectedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchUsers.rejected, (s) => {
        s.loading = false;
      });
  },
});

export const { selectUser } = usersSlice.actions;
export default usersSlice.reducer;
