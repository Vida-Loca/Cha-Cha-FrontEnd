import React, { useState } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import checkValidation from "../../../validation";

const ResetPassword = () => {
    const [sendingDataSpinner, setSendingDataSpinner] = useState(false);
    const [resetPass, setResetPass] = useState(false);
    const [email, setEmail] = useState({ value: "", isValid: false, touched: false, err: [] })

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
    const submitResetPassword = () => {
        if (email.isValid) {
            setSendingDataSpinner(true);
            setTimeout(() => {
                setResetPass(!resetPass);
                console.log("sending reset pass request ...");
                console.log({ email: email })
                setSendingDataSpinner(false);
            }, 3000)
        } else {
            console.log("emial is not valid")
        }

    }
    return (<div>
        {resetPass
            ? <p className="center">reset link has been sent to {email.value}</p>
            : <>
                <TextInput
                    onChange={onChangeHandler}
                    placeholder="E-mail"
                    name="email"
                    value={email.value}
                    classes={email.touched ^ email.isValid ? "input-orange" : "input-blue"}
                    error={email.err[0]}

                />
                {sendingDataSpinner
                    ? <Spinner classes={"spinner-container-h-sm"} size={"spinner-sm"} />
                    : <Button clicked={submitResetPassword} classes="btn-blueGradient btn-md submit-btn">Submit</Button>
                }

            </>
        }


    </div>)
}

export default ResetPassword;