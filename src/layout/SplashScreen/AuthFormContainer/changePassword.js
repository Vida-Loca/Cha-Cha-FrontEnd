import React, { useState, useContext } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
// import { authenticationService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";
import Spinner from "../../../components/Spinner";

import "./authStyle.scss";

const ChangePassword = () => {
    const [sendingDataSpinner, setSendingDataSpinner] = useState(false);

    const [, setChangedForm] = useContext(FormContext);
    const [login, setLogin] = useState({
        password: { value: "", isValid: true, err: [] },
        retypePassword: { value: "", isValid: true, err: [] }
    });

    const [changePassForm,] = useState([
        {
            name: "password",
            config: {
                type: 'text',
                placeholder: "password",
                classes: "input-blue"
            }
        },
        {
            name: "retypePassword",
            config: {
                type: 'text',
                placeholder: "retype password",
                classes: "input-blue"
            }
        }

    ]);

    const submitNewPassword = () => {
        if (login.password.isValid && login.retypePassword.isValid) {
            setSendingDataSpinner(true);
            setSendingDataSpinner(false);


        }
    }

    const onChangeHandler = event => {
        setLogin({
            ...login,
            [`${event.target.name}`]: { ...login[`${event.target.name}`], isValid: true, err: [], value: event.target.value }
        });
    };



    return (
        <div>
            {changePassForm.map(el => (
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
                ? <Spinner classes={"spinner-container-h-sm"} size={"spinner-sm"} />
                : <Button clicked={submitNewPassword} classes="btn-blueGradient btn-md submit-btn">update</Button>
            }
        </div>
    );
};

export default ChangePassword;
