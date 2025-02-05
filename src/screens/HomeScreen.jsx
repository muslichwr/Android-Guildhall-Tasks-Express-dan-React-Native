import React, { useEffect } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { fetchTodos } from "../store/todoSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Ambil data dari Redux
  const { user } = useSelector((state) => state.auth);
  const { todos, status } = useSelector((state) => state.todo);

  // Fetch data todo setelah login
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Fungsi Logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(logout());
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f4f4f4" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Welcome, {user?.username || "Guest"}!
      </Text>
      
      <TouchableOpacity
        onPress={() => navigation.navigate("Todo")}
        style={{
          backgroundColor: "#4CAF50",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Go to Todo List</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Your Tasks:
      </Text>

      {/* Loading & Error Handling */}
      {status === "loading" && <Text>Loading todos...</Text>}
      {status === "failed" && <Text>Error fetching todos</Text>}

      {/* List Todo */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 5,
              marginBottom: 10
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.task}</Text>
            <Text style={{ color: item.isDone ? "green" : "red" }}>
              {item.isDone ? "✔ Completed" : "❌ Not Done"}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
