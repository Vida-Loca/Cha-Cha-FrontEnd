import React, { useState, useContext } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { authenticationService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";
import { UserContext } from "../../../context/UserContext";

const LoginFormContainer = () => {
  const [changedForm, setChangedForm] = useContext(FormContext);
  const setUser = useContext(UserContext)[1];
  const [login, setLogin] = useState({ username: "", password: "" });
  const onChangeHandler = event => {
    setLogin({
      ...login,
      [`${event.target.name}`]: event.target.value
    });
    console.log(login);
  };

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
      <TextInput onChange={onChangeHandler} placeholder="username" name="username" />
      <TextInput onChange={onChangeHandler} placeholder="password" name="password" />

      <Button clicked={loginHandler} classes="btn-blueGradient btn-md">
        Log In
      </Button>
    </div>
  );
};

export default LoginFormContainer;
