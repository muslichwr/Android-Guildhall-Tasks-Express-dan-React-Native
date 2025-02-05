import React from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(todo.id, todo.isDone)}>
        <Text style={[styles.taskText, todo.isDone && styles.completed]}>
          {todo.task}
        </Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={() => onDelete(todo.id)} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
