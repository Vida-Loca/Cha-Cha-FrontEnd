import React, { useState, createContext } from "react";

export const NewEventCotext = createContext();

export const NewEventProvider = ({ children }) => {
  const [eventInfo, setEventInfo] = useState({
    information: { name: "", startDate: "", startTime: "", privacy: "" },
    address: { country: "", city: "", street: "", postcode: "", number: "" }
  });

  return <NewEventCotext.Provider value={[eventInfo, setEventInfo]}>{children}</NewEventCotext.Provider>;
};
