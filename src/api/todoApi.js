import axios from "./axiosInstance";

// Ambil daftar todo (dengan filter opsional berdasarkan status isDone)
export const fetchTodos = async (isDone = null) => {
  const url = isDone !== null ? `/api/todos?isDone=${isDone}` : "/api/todos";
  return axios.get(url);
};

// Tambah todo baru
export const createTodo = async (todoData) => {
  return axios.post("/api/todos", todoData);
};

// Update todo (ubah task atau status isDone)
export const updateTodo = async (id, updateData) => {
  return axios.put(`/api/todos/${id}`, updateData);
};

// Hapus todo berdasarkan ID
export const deleteTodo = async (id) => {
  return axios.delete(`/api/todos/${id}`);
};