import React, { useState } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import checkValidation from "../../../validation";

const ResetPassword = () => {
    const [email, setEmail] = useState({ value: "", isValid: false, err: [] })

    const onChangeHandler = event => {
        const validationResult = checkValidation(
            event.target.value,
            { email: true }
        );
        setEmail({
            value: event.target.value,
            isValid: validationResult[0],
            err: validationResult[1],
            touched: true
        });
    };
    return (<div>
        <TextInput
            onChange={onChangeHandler}
            placeholder="E-mail"
            name="email"
            value={email.value}
            classes={email.touched ^ email.isValid ? "input-orange" : "input-blue"}
            error={email.err[0]}
        />
        <Button classes="btn-blueGradient btn-md submit-btn">
            Submit
      </Button>
    </div>)
}

export default ResetPassword;