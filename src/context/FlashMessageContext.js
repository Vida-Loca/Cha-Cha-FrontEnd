import React, { useState, createContext } from "react";

export const FlashMessageContext = createContext();

// eslint-disable-next-line react/prop-types
export const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState({
    message: "",
    show: false,
    messageState: ""
  });

  return <FlashMessageContext.Provider value={[flashMessage, setFlashMessage]}>{children}</FlashMessageContext.Provider>;
};
