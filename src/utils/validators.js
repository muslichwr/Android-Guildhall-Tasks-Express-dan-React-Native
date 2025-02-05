// Validasi username (minimal 3 karakter, tanpa spasi)
export const validateUsername = (username) => {
    return /^[a-zA-Z0-9_]{3,}$/.test(username);
  };
  
  // Validasi password (minimal 6 karakter)
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  // Validasi konfirmasi password (harus sama dengan password)
  export const validatePasswordConfirm = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  // Validasi tugas (task) dalam Todo (minimal 3 karakter)
  export const validateTask = (task) => {
    return task.trim().length >= 3;
  };
  