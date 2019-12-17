import React from "react";
import "./globalStyles/App.scss";
import OpeningLayout from "./layout/OpeningPageLayout";
import MainLayout from "./layout/MainLayout";
import { FormProvider } from "./context/FormContext";

class App extends React.Component {
  state = {
    isLoggedIn: false
  };

  render() {
    return (
      <FormProvider>
        <div className="App">
          {this.state.isLoggedIn ? <MainLayout /> : <OpeningLayout />}
        </div>
      </FormProvider>
    );
  }
}

export default App;
