import React, { createContext, useState, useContext } from 'react';
import { login, register, getMe, resetPassword } from '@/services/auth'; // Import your authentication functions

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define your authentication functions
  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const response = await login(email, password);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data || "An error occurred while logging in.");
    }
  };

  const registerUser = async (email, password) => {
    try {
      setLoading(true);
      await register(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data || "An error occurred while registering.");
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getMe();
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setUser(null);
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  const resetUserPassword = async () => {
    try {
      setLoading(true);
      await resetPassword();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data || "An error occurred while resetting password.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        registerUser,
        fetchUser,
        logoutUser,
        resetUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
