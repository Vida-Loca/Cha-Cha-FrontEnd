/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect, useContext } from "react";
import { FormContext } from "../context/FormContext";
import { FlashMessageContext } from "../context/FlashMessageContext";

import SplashScreen from "./SplashScreen/SplashScreen";
import MainLayout from "./MainLayout/MainLayout";
import Modal from "../components/Modal";
import FlashMessage from "../components/FlashMessage";
import { authenticationService } from "../Authentication/service";

const MyApplication = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    authenticationService.currentUser.subscribe((x) => setLoggedIn(!!x));
  }, []);

  const [forms, setform] = useContext(FormContext);
  const [flashMessage, setFlashMessage] = useContext(FlashMessageContext);

  const hideModal = () => {
    setform({ ...forms, show: false });
  };
  const hideFlashMessage = () => {
    setFlashMessage({ ...flashMessage, show: false });
  };

  return (
    <div className="App">
      {
        flashMessage.show
        && <FlashMessage
          messageState={flashMessage.messageState}
          show={flashMessage.show}
          flashClose={hideFlashMessage}
          message={flashMessage.message}
        />
      }

      {forms.show
        && (
        <Modal show={forms.show} modalClose={hideModal}>
          {forms.renderForm}
        </Modal>
        )}
      {isLoggedIn ? <MainLayout /> : <SplashScreen />}
    </div>
  );
};

export default MyApplication;
