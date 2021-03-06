import React, { useState, useContext } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { authenticationService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";
import Spinner from "../../../components/Spinner";
import ResetPassword from "./resetPassword";

import "./authStyle.scss";

const LoginFormContainer = () => {
  const [sendingDataSpinner, setSendingDataSpinner] = useState(false);

  const [changedForm, setChangedForm] = useContext(FormContext);
  const [login, setLogin] = useState({
    username: { value: "", isValid: true, err: [] },
    password: { value: "", isValid: true, err: [] },
  });

  const loginForm = [
    {
      name: "username",
      config: {
        type: "text",
        placeholder: "username",
        classes: "input-blue",
      },
    },
    {
      name: "password",
      config: {
        type: "password",
        placeholder: "password",
        classes: "input-blue",
      },
    },
  ];

  const submitLogin = () => {
    if (login.username.isValid && login.password.isValid) {
      setSendingDataSpinner(true);

      authenticationService.login({
        username: login.username.value,
        password: login.password.value,
      }).then(() => {
        setChangedForm({ ...changedForm, show: false });
      }, (err) => {
        setLogin({
          ...login,
          username: { value: "", isValid: false, err: [err.username] },
          password: { value: "", isValid: false, err: [err.password] },
        });
        setSendingDataSpinner(false);
      });
    }
  };
  const onChangeHandler = (event) => {
    setLogin({
      ...login,
      [`${event.target.name}`]: {
        ...login[`${event.target.name}`], isValid: true, err: [], value: event.target.value,
      },
    });
  };

  const resetPasswordModal = () => {
    setChangedForm({ show: true, renderForm: <ResetPassword /> });
  };

  return (
    <div>
      {loginForm.map((el) => (
        <TextInput
          onChange={onChangeHandler}
          key={el.name}
          placeholder={el.config.placeholder}
          type={el.config.type}
          name={el.name}
          value={login[el.name].value}
          classes={login[el.name].isValid ? "input-blue" : "input-orange"}
          error={login[el.name].err[0]}
        />
      ))}

      {sendingDataSpinner
        ? <Spinner classes="spinner-container-h-sm" size="spinner-sm" />
        : <Button clicked={submitLogin} classes="btn-blueGradient btn-md submit-btn">Log In</Button>}
      ,
      <Button clicked={resetPasswordModal} classes="btn-orangeGradient btn-sm reset-password-btn">Forgot password</Button>
    </div>
  );
};

export default LoginFormContainer;
