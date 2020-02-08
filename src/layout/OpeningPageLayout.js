import React, { useState, useContext } from "react";
import Button from "../components/button/Button";
import Modal from "../components/Modal/Modal";
import TextInput from "../components/Inputs/TextInput/TextInput";
import Form from "../components/Form/Form";
import { FormContext } from "../context/FormContext";
import { UserContext } from "../context/UserContext";
import { authenticationService } from "../Authentication/service";

const OpeningPageLayout = props => {
  const [changedForm, setChangedForm] = useContext(FormContext);
  const [user, setUser] = useContext(UserContext);

  const [newState, seNewState] = useState({
    chooseForm: false,
    loginData: { username: "", password: "" },
    registerData: {
      username: "",
      password: "",
      matchingPassword: "",
      name: "",
      surname: "",
      email: ""
    }
  });

  const hideModal = () => {
    setChangedForm({ ...changedForm, show: false });
  };
  const openLogIn = () => {
    setChangedForm({ ...changedForm, show: true });
    seNewState({ ...newState, chooseForm: true });
  };

  const openRegister = () => {
    setChangedForm({ ...changedForm, show: true });
    seNewState({ ...newState, chooseForm: false });
  };

  const handleLoginChange = event => {
    seNewState({
      ...newState,
      loginData: {
        ...newState.loginData,
        [`${event.target.name}`]: event.target.value
      }
    });
  };

  const handleRegsterChange = event => {
    seNewState({
      ...newState,
      registerData: {
        ...newState.registerData,
        [`${event.target.name}`]: event.target.value
      }
    });
  };

  const registerHandler = event => {
    event.preventDefault();
    authenticationService.register(newState.registerData).then(
      result => {
        setChangedForm({ ...changedForm, show: false });
        console.log(result); // "Stuff worked!"
      },
      err => {
        console.log(err); // Error: "It broke"
      }
    );
  };

  const loginHandler = event => {
    event.preventDefault();
    authenticationService.login(newState.loginData).then(
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

  const logoutHandler = event => {
    event.preventDefault();
    authenticationService.logout();
  };

  const loginFrom = () => {
    return (
      <Form>
        <TextInput
          onChange={handleLoginChange}
          placeholder="username"
          name="username"
        />
        <TextInput
          onChange={handleLoginChange}
          placeholder="password"
          name="password"
        />

        <Button clicked={loginHandler} classes="btn-blueGradient btn-md">
          Log In
        </Button>
      </Form>
    );
  };

  const registerForm = () => {
    const data = [
      { placeholder: "username", name: "username" },
      { placeholder: "password", name: "password" },
      { placeholder: "repeat rassword", name: "matchingPassword" },
      { placeholder: "name", name: "name" },
      { placeholder: "surname", name: "surname" },
      { placeholder: "e-mail", name: "email" }
    ];
    return (
      <Form>
        {data.map(inputs => {
          return (
            <TextInput
              onChange={handleRegsterChange}
              placeholder={inputs.placeholder}
              name={inputs.name}
              key={inputs.name}
            />
          );
        })}

        <Button clicked={registerHandler} classes="btn-blueGradient btn-md">
          Submit
        </Button>
      </Form>
    );
  };

  return (
    <div className="FirstLayout">
      <Modal show={changedForm.show} modalClose={hideModal}>
        {newState.chooseForm ? loginFrom() : registerForm()}
      </Modal>

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

export default OpeningPageLayout;
