import React, { useState, createContext } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: "",
    isAdmin: false,
  });

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
