import React, { useState, useContext } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { authenticationService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";
import { UserContext } from "../../../context/UserContext";

const RegistrationFormContainer = () => {
  const [changedForm, setChangedForm] = useContext(FormContext);
  const setUser = useContext(UserContext)[1];
  const [registration, setRegistration] = useState({
    username: "",
    password: "",
    matchingPassword: "",
    name: "",
    surname: "",
    email: ""
  });

  const data = [
    { placeholder: "username", name: "username" },
    { placeholder: "password", name: "password" },
    { placeholder: "repeat rassword", name: "matchingPassword" },
    { placeholder: "name", name: "name" },
    { placeholder: "surname", name: "surname" },
    { placeholder: "e-mail", name: "email" }
  ];
  const onChangeHandler = event => {
    setRegistration({
      ...registration,
      [`${event.target.name}`]: event.target.value
    });
    console.log(registration);
  };

  const registerHandler = event => {
    event.preventDefault();
    authenticationService.register(registration).then(
      result => {
        setChangedForm({ ...changedForm, show: false });
        console.log(result); // "Stuff worked!"
      },
      err => {
        console.log(err); // Error: "It broke"
      }
    );
  };
  return (
    <div>
      {data.map(inputs => {
        return (
          <TextInput onChange={onChangeHandler} placeholder={inputs.placeholder} name={inputs.name} key={inputs.name} />
        );
      })}

      <Button clicked={registerHandler} classes="btn-blueGradient btn-md">
        Submit
      </Button>
    </div>
  );
};

export default RegistrationFormContainer;
