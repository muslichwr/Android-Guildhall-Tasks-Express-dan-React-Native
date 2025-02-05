import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

// Async Action untuk mengambil daftar Todo
export const fetchTodos = createAsyncThunk("todo/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/todos");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Tambahan jika ingin update secara lokal
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
