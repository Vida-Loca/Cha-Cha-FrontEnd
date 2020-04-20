import React, { useContext } from 'react'
import { Button } from "../../../../components/Button";
import { FormContext } from "../../../../context/FormContext";
import { history } from "../../../../Authentication/helper";
import { eventService } from "../../../../Authentication/service";

import "./leaveEvent.scss";

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
        <div className="leave-event-container">
            <h2>Do you wan to leave th is event ?</h2>
            <div class="leave-btn-group">
                <Button clicked={leaveEvent} classes="btn-blueGradient btn-md">
                    YES
             </Button>
                <Button clicked={cancelAction} classes="btn-orangeGradient btn-md">
                    NO
            </Button>
            </div>
        </div>
    )
}


export default LeaveEventContainer;