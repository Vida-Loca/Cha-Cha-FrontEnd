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
    loginData: { username: "", password: "" },
    registerData: {
      username: "",
      password: "",
      password2: "",
      name: "",
      lastname: "",
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
    const data = [
      { placeholder: "username", name: "username" },
      { placeholder: "password", name: "password" },
      { placeholder: "repeat rassword", name: "password2" },
      { placeholder: "name", name: "name" },
      { placeholder: "lastname", name: "lastname" },
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
      </div>
    </div>
  );
};

export default OpeningPageLayout;
