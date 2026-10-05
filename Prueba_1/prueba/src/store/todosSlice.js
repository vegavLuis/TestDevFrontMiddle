import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/jsonplaceholder";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  api.getTodosByUser,
);

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const saved = await api.createTodo(todo);
  return saved;
});

const sortDesc = (arr) => [...arr].sort((a, b) => b.id - a.id);

const todosSlice = createSlice({
  name: "todos",
  initialState: { list: [], loading: false, saving: false },
  reducers: {
    clearTodos: (s) => {
      s.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (s, a) => {
        s.loading = false;
        s.list = sortDesc(a.payload);
      })
      .addCase(fetchTodos.rejected, (s) => {
        s.loading = false;
      })
      .addCase(addTodo.pending, (s) => {
        s.saving = true;
      })
      .addCase(addTodo.fulfilled, (s, a) => {
        s.saving = false;
        s.list = sortDesc([...s.list, a.payload]);
      })
      .addCase(addTodo.rejected, (s) => {
        s.saving = false;
      });
  },
});

export const { clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
