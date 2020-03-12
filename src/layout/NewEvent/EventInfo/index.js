import React, { useState, useContext } from "react";
import { NewEventCotext } from "../../../context/NewEventContext";
import checkValidation from "../../../validation";
import { TextInput, RadioInput } from "../../../components/Inputs";

const EventInfo = ({ onChange, name, startDate, startTime, privacy }) => {

    // const [informatoionContext, setInformationContext] = useContext(NewEventCotext)
    const [Information, setInformation] = useState({
        name: { value: name, isValid: false, err: "", touched: false },
        startDate: { value: startDate, isValid: false, err: "", touched: false },
        startTime: { value: startTime, isValid: false, err: "", touched: false },
        privacy: { value: privacy, isValid: false, err: "", touched: false }
    });
    const formInfo = useState([
        {
            name: "name",
            config: {
                placeholder: "event name",
                classes: "input-blue"
            },
            validation: {
                required: true,
                string: true
            }
        },
        {
            name: "startDate",
            config: {
                placeholder: "start date",
                classes: "input-blue"
            },
            validation: {
                required: true,
                maxLength: 10
            }
        },
        {
            name: "startTime",
            config: {
                placeholder: "start time",
                classes: "input-blue"
            },
            validation: {
                required: true
            }
        },
        {
            name: "privacy",
            config: {
                placeholder: "privacy",
                classes: "input-blue"
            },
            validation: {
                required: true
            }
        }
    ])[0];
    // const onChangeHandlerEvent = event => {
    //     const validationResult = checkValidation(
    //         event.target.value,
    //         formInfo.find(x => x.name === event.target.name).validation
    //     );
    //     setInformation({
    //         ...Information,
    //         [`${event.target.name}`]: {
    //             value: event.target.value,
    //             isValid: validationResult[0],
    //             err: validationResult[1],
    //             touched: true
    //         }
    //     });
    // };
    return (<>
        <h2>Event information</h2>
        {formInfo.map(el => (
            <TextInput
                onChange={onChange}
                key={el.name}
                placeholder={el.config.placeholder}
                type={el.config.type}
                name={el.name}
                classes={Information[el.name].touched ^ Information[el.name].isValid ? "input-orange" : el.config.classes}
                error={Information[el.name].err[0]}
            />
        ))}
    </>)
}

export default EventInfo;