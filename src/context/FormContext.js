import React, { useState, createContext } from "react";

export const FormContext = createContext();

// eslint-disable-next-line react/prop-types
export const FormProvider = ({ children }) => {
  const [form, setform] = useState({
    renderForm: "",
    show: false
  });

  return <FormContext.Provider value={[form, setform]}>{children}</FormContext.Provider>;
};
