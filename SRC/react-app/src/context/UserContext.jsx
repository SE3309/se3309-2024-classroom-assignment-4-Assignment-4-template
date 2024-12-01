/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage on component mount
    const savedUser = localStorage.getItem('user');
    console.log(savedUser);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    // Store both the token and user data
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
