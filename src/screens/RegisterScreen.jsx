import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUser } from "../api/authApi";
import { setUser } from "../store/authSlice";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await registerUser({ username, password, passwordConfirm });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data));

      navigation.replace("Home"); // Setelah registrasi sukses, langsung ke Home
    } catch (error) {
      Alert.alert("Registration failed", error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TextInput placeholder="Confirm Password" secureTextEntry onChangeText={setPasswordConfirm} />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Already have an account? Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
