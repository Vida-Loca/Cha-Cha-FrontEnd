import React from "react";
import "./globalStyles/App.scss";
import MyApplication from "./layout/MyApplication";
import { FormProvider } from "./context/FormContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <FormProvider>
        <MyApplication />
      </FormProvider>
    </UserProvider>
  );
};

export default App;
