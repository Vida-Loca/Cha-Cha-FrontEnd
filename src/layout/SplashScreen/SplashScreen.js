import React, { useState, useContext } from "react";
import { Button } from "../../components/Button";
import { FormContext } from "../../context/FormContext";
import { LoginFormContainer, RegisterFormContainer } from "./AuthFormContainer";

import "./SplashScreen.scss";

const SplashScreen = () => {
  const setChangedForm = useContext(FormContext)[1];

  const openLogIn = () => {
    setChangedForm({ show: true, renderForm: <LoginFormContainer /> });
  };

  const openRegister = () => {
    setChangedForm({ show: true, renderForm: <RegisterFormContainer /> });
  };

  return (
    <div className="FirstLayout">
      <div className="SignContent">
        <h1>Skibidi</h1>
        <Button clicked={openLogIn} classes="btn-blueGradient btn-lg">
          Sign In
        </Button>
        <Button clicked={openRegister} classes="btn-orangeGradient btn-lg">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
