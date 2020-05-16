import React, { useContext } from 'react'
import { Button } from "../../../../components/Button";
import { FormContext } from "../../../../context/FormContext";
import { FlashMessageContext } from "../../../../context/FlashMessageContext";
import { history } from "../../../../Authentication/helper";
import { eventService } from "../../../../Authentication/service";

import "../LeaveEventContainer/leaveEvent.scss";

const EndEventContainer = ({ eventId, currentEvent }) => {
    const [, setform] = useContext(FormContext);
    const [, setFlashMessage] = useContext(FlashMessageContext);

    const cancelAction = () => {
        setform({ show: false, renderForm: "" });
    }

    
    const endEvent = () => {
        eventService.updateEvent(eventId, {
            ...currentEvent, startTime: currentEvent.startTime.replace(" ","T"), over: true
        }).then(_res =>{
            setform({ show: false, renderForm: "" });
            setFlashMessage({
                message: "event is successfully finished",
                show: true,
                messageState: "success"
            });
        }, err =>{
            console.log(err);
        });

    }
    return (
        <div className="leave-event-container">
            <h3>Are you sure you want to end this event ?</h3>
            <div className="leave-btn-group">
            <Button clicked={endEvent} classes="btn-blueGradient btn-md">
                    YES
             </Button>
                <Button clicked={cancelAction} classes="btn-orangeGradient btn-md">
                    NO
            </Button>
            </div>
        </div>
    )
}


export default EndEventContainer;