import React, { useState } from "react";
import Button from "../components/button/Button";
import Modal from "../components/Modal/Modal";
import TextInput from "../components/Inputs/TextInput/TextInput";
import Form from "../components/Form/Form";

const OpeningPageLayout = props => {
  // state = { chooseForm: false, show: false };
  const [newState, seNewState] = useState({
    chooseForm: false,
    show: false,
    loginData: { username: "k", password: "" },
    registerData: {
      username: "",
      password: "",
      password2: "",
      name: "",
      surname: "",
      email: ""
    }
  });

  const hideModal = () => {
    seNewState({ ...newState, show: false });
  };

  const openLogIn = () => {
    // showModal();
    seNewState({ ...newState, chooseForm: true, show: true });
    console.log(newState);
  };

  const openRegister = () => {
    // showModal();
    seNewState({ ...newState, chooseForm: false, show: true });
    console.log(newState);
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
        <em>Forot Password</em>
        <Button classes="btn-blueGradient btn-md">Log In</Button>
      </Form>
    );
  };

  const registerForm = () => {
    return (
      <Form>
        <TextInput
          onChange={handleRegsterChange}
          placeholder="username"
          name="username"
        />
        <TextInput
          onChange={handleRegsterChange}
          placeholder="password"
          name="password"
        />
        <TextInput
          onChange={handleRegsterChange}
          placeholder="repeat password"
          name="password2"
        />
        <TextInput
          onChange={handleRegsterChange}
          placeholder="name"
          name="name"
        />
        <TextInput
          onChange={handleRegsterChange}
          placeholder="surname"
          name="surname"
        />
        <TextInput
          onChange={handleRegsterChange}
          placeholder="e-mail"
          name="email"
        />
        <Button classes="btn-blueGradient btn-md">Submit</Button>
      </Form>
    );
  };

  return (
    <div className="FirstLayout">
      <Modal show={newState.show} modalClose={hideModal}>
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
        {props.children}
      </div>
    </div>
  );
};

export default OpeningPageLayout;
