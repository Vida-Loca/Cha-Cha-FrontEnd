import React, { useState } from "react";
import checkValidation from "../../../validation";
import { TextInput, RadioInput } from "../../../components/Inputs";

const EventAdress = () => {

    const [newAddress, setNewAddress] = useState({
        country: { value: "", isValid: false, err: "", touched: false },
        city: { value: "", isValid: false, err: "", touched: false },
        street: { value: "", isValid: false, err: "", touched: false },
        postcode: { value: "", isValid: false, err: "", touched: false },
        number: { value: "", isValid: false, err: "", touched: false }
    });
    const formAdress = useState([
        {
            name: "country",
            config: {
                placeholder: "coutnry",
                classes: "input-blue"
            },
            validation: {
                required: true,
                string: true
            }
        },
        {
            name: "city",
            config: {
                placeholder: "city",
                classes: "input-blue"
            },
            validation: {
                required: true,
                maxLength: 10
            }
        },
        {
            name: "street",
            config: {
                placeholder: "street",
                classes: "input-blue"
            },
            validation: {
                required: true
            }
        },
        {
            name: "postcode",
            config: {
                placeholder: "post code",
                classes: "input-blue"
            },
            validation: {
                required: true
            }
        },
        {
            name: "number",
            config: {
                placeholder: "apartment number",
                classes: "input-blue",
                disabled: true
            },
            validation: {
                required: true
            }
        }
    ])[0];
    const onChangeHandlerAddress = event => {
        const validationResult = checkValidation(
            event.target.value,
            formAdress.find(x => x.name === event.target.name).validation
        );
        setNewAddress({
            ...newAddress,
            [`${event.target.name}`]: {
                value: event.target.value,
                isValid: validationResult[0],
                err: validationResult[1],
                touched: true
            }
        });
        // let testValidity = true;
        // for (let key in newAddress) {
        //   testValidity = newAddress[key].isValid && testValidity;
        // }
        // setFormValid(testValidity);
    };
    return <>
        <h2>Address</h2>
        {formAdress.map(el => (
            <TextInput
                onChange={onChangeHandlerAddress}
                key={el.name}
                placeholder={el.config.placeholder}
                type={el.config.type}
                name={el.name}
                classes={newAddress[el.name].touched ^ newAddress[el.name].isValid ? "input-orange" : el.config.classes}
                error={newAddress[el.name].err[0]}
            />
        ))}

    </>
}

export default EventAdress;