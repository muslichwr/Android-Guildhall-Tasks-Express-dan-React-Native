import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todoSlice.actions;

// **Thunk untuk mengambil daftar todo**
export const loadTodos = (isDone = null) => async (dispatch) => {
  try {
    const response = await fetchTodos(isDone);
    dispatch(setTodos(response.data));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

// **Thunk untuk menambahkan todo baru**
export const addTodo = (todoData) => async (dispatch) => {
  try {
    await createTodo(todoData);
    dispatch(loadTodos()); // Refresh daftar todo setelah menambahkan
  } catch (error) {
    console.error("Error creating todo:", error);
  }
};

// **Thunk untuk memperbarui todo**
export const modifyTodo = (id, updateData) => async (dispatch) => {
  try {
    await updateTodo(id, updateData);
    dispatch(loadTodos());
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

// **Thunk untuk menghapus todo**
export const removeTodo = (id) => async (dispatch) => {
  try {
    await deleteTodo(id);
    dispatch(loadTodos());
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

export default todoSlice.reducer;