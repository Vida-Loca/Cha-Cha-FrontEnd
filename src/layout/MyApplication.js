import React, { useState, useEffect, useContext } from "react";
import { FormContext } from "../context/FormContext";

import SplashScreen from "./SplashScreen/SplashScreen";
import MainLayout from "./MainLayout/MainLayout";
import Modal from "../components/Modal";
import { authenticationService } from "../Authentication/service";

const MyApplication = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    authenticationService.currentUser.subscribe(x => setLoggedIn(!!x));
  }, []);

  const [forms, setform] = useContext(FormContext);

  const hideModal = () => {
    setform({ ...forms, show: false });
  };

  return (
    <div className="App">
      {forms.show
        && <Modal show={forms.show} modalClose={hideModal}>
          {forms.renderForm}
        </Modal>}

      {isLoggedIn ? <MainLayout /> : <SplashScreen />}
    </div>
  );
};

export default MyApplication;
