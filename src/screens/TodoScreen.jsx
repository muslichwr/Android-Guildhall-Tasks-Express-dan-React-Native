import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";
import { setTodos } from "../store/todoSlice";

export default function TodoScreen() {
  const [task, setTask] = useState("");
  const [isDoneFilter, setIsDoneFilter] = useState(null); // null = all, true = completed, false = not completed
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  // Ambil daftar todo saat halaman dibuka atau filter berubah
  useEffect(() => {
    loadTodos();
  }, [isDoneFilter]);

  const loadTodos = async () => {
    try {
      const response = await fetchTodos(isDoneFilter);
      dispatch(setTodos(response.data));
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const handleAddTodo = async () => {
    if (!task.trim()) {
      Alert.alert("Error", "Task cannot be empty");
      return;
    }

    try {
      await createTodo({ task });
      setTask("");
      loadTodos(); // Refresh daftar todo
    } catch (error) {
      console.error("Error creating todo", error);
    }
  };

  const handleToggleTodo = async (id, isDone) => {
    try {
      await updateTodo(id, { isDone: !isDone });
      loadTodos();
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <View>
      <Text>Todo List</Text>
      <TextInput placeholder="New Task" value={task} onChangeText={setTask} />
      <Button title="Add Task" onPress={handleAddTodo} />

      {/* Filter Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 10 }}>
        <Button title="All" onPress={() => setIsDoneFilter(null)} />
        <Button title="Completed" onPress={() => setIsDoneFilter(true)} />
        <Button title="Not Completed" onPress={() => setIsDoneFilter(false)} />
      </View>

      {/* Todo List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
            <TouchableOpacity onPress={() => handleToggleTodo(item.id, item.isDone)}>
              <Text style={{ textDecorationLine: item.isDone ? "line-through" : "none" }}>
                {item.task}
              </Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
