import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../context/UserContext";
import { FormContext } from "../context/FormContext";

import SplashScreen from "./SplashScreen/SplashScreen";
import MainLayout from "./MainLayout/MainLayout";
import Modal from "../components/Modal";
import { authenticationService } from "../Authentication/service";

const MyApplication = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [isUser, setUser] = useState(true);

  useEffect(() => {
    authenticationService.currentUser.subscribe(x => setLoggedIn(!!x));
    //   if (isUser.break) {
    //     const currentU = authenticationService.CurrentUser();
    //     setUser({ ...isUser, break: false });
    //     if (currentU != null || isUser.isLoggedIn) {
    //       setLoggedIn({
    //         isLoggedIn: true
    //       });
    //     } else {
    //       setLoggedIn({
    //         isLoggedIn: false
    //       });
    //     }
    //   }
  }, []);

  const [forms, setform] = useContext(FormContext);

  const hideModal = () => {
    setform({ ...forms, show: false, message: "" });
  };

  return (
    <div className="App">
      <Modal show={forms.show} modalClose={hideModal} message={forms.message}>
        {forms.renderForm}
      </Modal>
      {isLoggedIn ? <MainLayout /> : <SplashScreen />}
    </div>
  );
};

export default MyApplication;
