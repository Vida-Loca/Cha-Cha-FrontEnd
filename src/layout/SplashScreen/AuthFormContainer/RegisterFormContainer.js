import React, { useState } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { authenticationService } from "../../../Authentication/service";
// import { FormContext } from "../../../context/FormContext";
import Spinner from "../../../components/Spinner";
import checkValidation from "../../../validation";
import RegistrationComplete from "./RegistrationComplete";

const RegistrationFormContainer = () => {
  const [sendingDataSpinner, setSendingDataSpinner] = useState(false);
  // const [changedForm, setChangedForm] = useContext(FormContext);
  // const [,setUser] = useContext(UserContext);
  const [registrationConfrimed, setRefistrationConfirm] = useState(false);
  const [registration, setRegistration] = useState({
    username: { value: "", isValid: false, err: [], touched: false },
    password: { value: "", isValid: false, err: [], touched: false },
    matchingPassword: { value: "", isValid: false, err: [], touched: false },
    name: { value: "", isValid: false, err: [], touched: false },
    surname: { value: "", isValid: false, err: [], touched: false },
    email: { value: "", isValid: false, err: [], touched: false }
  });

  const registerForm = [
    {
      name: "username",
      config: {
        type: 'text',
        placeholder: "username",
        classes: "input-blue"
      },
      validation: {
        required: true,
        string: true,
        minLength: 3,
        maxLength: 25,
        spaces: true
      }
    },
    {
      name: "password",
      config: {
        type: 'text',
        placeholder: "password",
        classes: "input-blue"
      },
      validation: {
        required: true,
        spaces: true,
        minLength: 8,
        maxLength: 25,
      }
    },
    {
      name: "matchingPassword",
      config: {
        type: 'text',
        placeholder: "retype password",
        classes: "input-blue"
      },
      validation: {
        required: true,
      }
    },
    {
      name: "name",
      config: {
        type: 'text',
        placeholder: "name",
        classes: "input-blue"
      },
      validation: {
        required: true,
        string: true,
        maxLength: 35,
      }
    },
    {
      name: "surname",
      config: {
        type: 'text',
        placeholder: "surname",
        classes: "input-blue"
      },
      validation: {
        required: true,
        string: true,
        maxLength: 35,
      }
    },
    {
      name: "email",
      config: {
        type: 'text',
        placeholder: "email",
        classes: "input-blue"
      },
      validation: {
        required: true,
        email: true
      }
    }

  ];
  const onChangeHandler = event => {
    const validationResult = checkValidation(
      event.target.value,
      registerForm.find(x => x.name === event.target.name).validation
    );
    setRegistration({
      ...registration,
      [`${event.target.name}`]: {
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1],
        touched: true
      }
    });
  };

  const submitRegstartion = () => {
    if (registration.username.isValid && registration.password.isValid &&
      registration.matchingPassword.value === registration.password.value
      && registration.name.isValid && registration.surname.isValid &&
      registration.email.isValid) {
      setSendingDataSpinner(true);
      authenticationService.register({
        username: registration.username.value,
        name: registration.name.value,
        surname: registration.surname.value,
        email: registration.email.value,
        password: registration.password.value,
        matchingPassword: registration.matchingPassword.value,
        picUrl: ""
      }).then(res => {
        console.log(res);
        console.log("smile");

        setRefistrationConfirm(true);
        setSendingDataSpinner(false);

      }, err => {
        console.log(err);
        setSendingDataSpinner(false);
        console.log("not")
      });

    }
  }


  return (
    <div>
      {registrationConfrimed
        ?
        <RegistrationComplete email={registration.email.value} />
        : <>
          {registerForm.map(el => (
            <TextInput
              onChange={onChangeHandler}
              key={el.name}
              placeholder={el.config.placeholder}
              type={el.config.type}
              name={el.name}
              value={registration[el.name].value}
              classes={registration[el.name].touched ^ registration[el.name].isValid ? "input-orange" : el.config.classes}
              error={registration[el.name].err[0]}
            />
          ))}
          {sendingDataSpinner
            ? <Spinner classes={"spinner-container-h-sm"} size={"spinner-sm"} />
            : <Button clicked={submitRegstartion} classes="btn-blueGradient btn-md submit-btn">Register</Button>
          }
        </>}


    </div>
  );
};

export default RegistrationFormContainer;
