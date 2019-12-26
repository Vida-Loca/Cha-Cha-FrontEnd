import React, { useState, useContext } from "react";
import Button from "../components/button/Button";
import Modal from "../components/Modal/Modal";
import TextInput from "../components/Inputs/TextInput/TextInput";
import Form from "../components/Form/Form";
import { FormContext } from "../context/FormContext";

const OpeningPageLayout = props => {
  const [changedForm, setChangedForm] = useContext(FormContext);

  const [newState, seNewState] = useState({
    chooseForm: false,
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
    setChangedForm({ ...changedForm, show: false });
  };
  const openLogIn = () => {
    // showModal();
    setChangedForm({ ...changedForm, show: true });
    seNewState({ ...newState, chooseForm: true });
  };

  const openRegister = () => {
    // showModal();
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
