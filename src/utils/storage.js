import AsyncStorage from "@react-native-async-storage/async-storage";

// Simpan data ke AsyncStorage
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

// Ambil data dari AsyncStorage
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};

// Hapus data dari AsyncStorage
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data:", error);
  }
};

// Simpan token autentikasi
export const setAuthToken = async (token) => {
  await setItem("token", token);
};

// Ambil token autentikasi
export const getAuthToken = async () => {
  return await getItem("token");
};

// Hapus token autentikasi
export const removeAuthToken = async () => {
  await removeItem("token");
};
