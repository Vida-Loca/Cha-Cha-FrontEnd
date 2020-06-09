import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "../../../../components/Button";
import { FormContext } from "../../../../context/FormContext";
import { FlashMessageContext } from "../../../../context/FlashMessageContext";
import { eventService } from "../../../../Authentication/service";

import "../LeaveEventContainer/leaveEvent.scss";

const EndEventContainer = ({ eventId, currentEvent }) => {
  const [, setform] = useContext(FormContext);
  const [, setFlashMessage] = useContext(FlashMessageContext);

  const cancelAction = () => {
    setform({ show: false, renderForm: "" });
  };


  const endEvent = () => {
    eventService.updateEvent(eventId, {
      ...currentEvent, startTime: currentEvent.startTime.replace(" ", "T"), over: true,
    }).then(() => {
      setform({ show: false, renderForm: "" });
      setFlashMessage({
        message: "event is successfully finished",
        show: true,
        messageState: "success",
      });
    })
      .catch(() => {});
  };
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
  );
};

EndEventContainer.propTypes = {
  eventId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentEvent: PropTypes.object.isRequired,
};

export default EndEventContainer;
