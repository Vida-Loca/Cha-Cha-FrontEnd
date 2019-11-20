import React, { useState, createContext } from "react";

export const FormContext = createContext();

export const FormProvider = props => {
  const [form, setform] = useState({ c: "" });

  return (
    <FormContext.Provider value={[form, setform]}>
      {props.children}
    </FormContext.Provider>
  );
};
