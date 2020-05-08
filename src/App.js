import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./style/App.scss";
import MyApplication from "./layout/MyApplication";
import { FormProvider } from "./context/FormContext";
import { UserProvider } from "./context/UserContext";
import { FlashMessageProvider } from "./context/FlashMessageContext";

const App = () => {
  return (
    <BrowserRouter >
    <FlashMessageProvider>
      <UserProvider>
        <FormProvider>
          <MyApplication />
        </FormProvider>
      </UserProvider>
      </FlashMessageProvider>
    </BrowserRouter>
  );
};

export default App;
