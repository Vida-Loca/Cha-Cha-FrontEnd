import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { profileService } from "../../../Authentication/service";
import checkValidation from "../../../validation";
import Spinner from "../../../components/Spinner";

import "./authStyle.scss";

const ChangePassword = ({ token }) => {
  const [sendingDataSpinner, setSendingDataSpinner] = useState(false);

  // const [, setChangedForm] = useContext(FormContext);
  const [login, setLogin] = useState({
    password: { value: "", isValid: true, err: [] },
    retypePassword: { value: "", isValid: true, err: [] },
  });

  const changePassForm = [
    {
      name: "password",
      config: {
        type: "text",
        placeholder: "password",
        classes: "input-blue",
      },
      validation: {
        required: true,
        minLength: 8,
      },
    },
    {
      name: "retypePassword",
      config: {
        type: "text",
        placeholder: "retype password",
        classes: "input-blue",
      },
      validation: {
        required: true,
        minLength: 8,
      },
    },
  ];

  const submitNewPassword = () => {
    if (login.password.isValid && login.retypePassword.isValid) {
      profileService.resetPassword("1", "370c0368-de80-4194-95dc-c0309d3b4284", login.password.value, login.retypePassword.value)
        .then((res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });
      setSendingDataSpinner(true);
      setSendingDataSpinner(false);
      // console.log(`this is the token:`,token);
    }
    // console.log(`this is the token:`,token);
  };

  const onChangeHandler = (event) => {
    const validationResult = checkValidation(
      event.target.value,
      changePassForm.find((x) => x.name === event.target.name).validation,
    );
    setLogin({
      ...login,
      [`${event.target.name}`]: {
        isValid: true,
        err: validationResult[1],
        value: event.target.value,
      },
    });
  };

  return (
    <div>
      {changePassForm.map((el) => (
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
        : <Button clicked={submitNewPassword} classes="btn-blueGradient btn-md submit-btn">update</Button>}
      ,
    </div>
  );
};

ChangePassword.propTypes = {
  token: PropTypes.string.isRequired,
};


export default ChangePassword;
