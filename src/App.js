import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./style/App.scss";
import MyApplication from "./layout/MyApplication";
import { FormProvider } from "./context/FormContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <BrowserRouter >
      <UserProvider>
        <FormProvider>
          <MyApplication />
        </FormProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
