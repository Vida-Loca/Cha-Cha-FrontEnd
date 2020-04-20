import React, { useContext } from 'react'
import { Button } from "../../../../components/Button";
import { FormContext } from "../../../../context/FormContext";
import { history } from "../../../../Authentication/helper";
import { eventService } from "../../../../Authentication/service";

const LeaveEventContainer = ({ eventId }) => {
    const [, setform] = useContext(FormContext);

    const cancelAction = () => {
        setform({ show: false, renderForm: "" });
    }

    const leaveEvent = () => {
        eventService.leaveEvent(eventId)
            .then(res => {
                console.log(res);
                setform({ show: false, renderForm: "" });
                history.push("/");
            }, err => {
                console.log(err);
            })

    }
    return (
        <div>
            <h2>Do you wan to leave th is event ?</h2>
            <Button clicked={leaveEvent} classes="btn-blueGradient btn-md">
                YES
             </Button>
            <Button clicked={cancelAction} classes="btn-orangeGradient btn-md">
                NO
            </Button>
        </div>
    )
}


export default LeaveEventContainer;