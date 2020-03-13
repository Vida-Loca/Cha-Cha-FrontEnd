import React, { useState, useContext } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { authenticationService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";
import { UserContext } from "../../../context/UserContext";

import ResetPassword from "./resetPassword";

import "./authStyle.scss";

const LoginFormContainer = () => {
  const [changedForm, setChangedForm] = useContext(FormContext);
  const setUser = useContext(UserContext)[1];
  const [login, setLogin] = useState({
    username: { value: "", isValid: false, err: [], touched: false },
    password: { value: "", isValid: false, err: [], touched: false }
  });

  const loginForm = useState([
    {
      name: "username",
      config: {
        type: 'text',
        placeholder: "username",
        classes: "input-blue"
      }
    },
    {
      name: "password",
      config: {
        type: 'password',
        placeholder: "password",
        classes: "input-blue"
      }
    }

  ])[0];

  const onChangeHandler = event => {
    setLogin({
      ...login,
      [`${event.target.name}`]: { ...login[`${event.target.name}`], value: event.target.value }
    });
    console.log(login);
  };

  const resetPasswordModal = () => {
    setChangedForm({ show: true, renderForm: <ResetPassword /> });
  }

  const loginHandler = event => {
    authenticationService.login(login).then(
      result => {
        setUser({ isLoggedIn: true, break: true });
        setChangedForm({ ...changedForm, show: false });
        console.log(result); // "Stuff worked!"
      },
      err => {
        setUser({ isLoggedIn: false, break: true });
        console.log(err); // Error: "It broke"
      }
    );
  };
  return (
    <div>
      {loginForm.map(el => (
        <TextInput
          onChange={onChangeHandler}
          key={el.name}
          placeholder={el.config.placeholder}
          type={el.config.type}
          name={el.name}
          value={login[el.name].value}
          classes={login[el.name].touched ^ login[el.name].isValid ? "input-orange" : el.config.classes}
          error={login[el.name].err[0]}
        />
      ))}

      <Button clicked={loginHandler} classes="btn-blueGradient btn-md submit-btn">
        Log In
      </Button>
      <Button clicked={resetPasswordModal} classes="btn-orangeGradient btn-sm reset-password-btn">Forgot password</Button>
    </div>
  );
};

export default LoginFormContainer;
