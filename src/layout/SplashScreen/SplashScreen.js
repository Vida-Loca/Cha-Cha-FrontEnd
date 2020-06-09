import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Button } from "../../components/Button";
import { FormContext } from "../../context/FormContext";
import { LoginFormContainer, RegisterFormContainer } from "./AuthFormContainer";

import { parseQuery } from "../../validation/queryParser";

import ChangePassword from "./AuthFormContainer/changePassword";

import "./SplashScreen.scss";

const SplashScreen = () => {
  const [, setChangedForm] = useContext(FormContext);

  const openLogIn = () => {
    setChangedForm({ show: true, renderForm: <LoginFormContainer /> });
  };

  const openRegister = () => {
    setChangedForm({ show: true, renderForm: <RegisterFormContainer /> });
  };

  const changePassword = (match) => {
    const { token, userId } = parseQuery(match);
    setChangedForm({ renderForm: <ChangePassword token={token} userId={userId} />, show: true });
    return <Redirect to="/" />;
  };

  return (
    <div className="FirstLayout">
      <div className="SignContent">
        <div className="logo">
          <img src="/logo.svg" alt="skibidi"></img>
          <h1>Skibidi</h1>
        </div>
        <Button clicked={openLogIn} classes="btn-blueGradient btn-lg btn-blue-animated">
          Sign In
        </Button>
        <Button clicked={openRegister} classes="btn-orangeGradient btn-orange-animated btn-lg">
          Sign Up
        </Button>
        <Route path="/user/changePassword" render={({ location }) => changePassword(location.search)} />
      </div>
    </div>
  );
};

export default SplashScreen;
