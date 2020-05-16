import React from 'react'
import PropTypes from "prop-types";

import "./EventInfoCard.scss";

const EventInfoCard = ({eventName, date, country, eventState, clicked}) => {
    return (
        <div onClick={clicked} className="event-info-card-container">
            <div className="event-name">{eventName}</div>
            <div className="data-state">
                <span className="date">
                    <i className="fas fa-calendar-alt" />
                    {date}
                </span>
                <span className="eventState">{eventState ? "finished" : "ongoing"}</span>
            </div>
            <div className="country">
                <i className="fas fa-map-marker-alt" />
                {country}
            </div>
        </div>
    )
}

EventInfoCard.propTypes = {
    eventName: PropTypes.string.isRequired, 
    date: PropTypes.string.isRequired, 
    country: PropTypes.string.isRequired, 
    eventState: PropTypes.bool.isRequired, 
    clicked: PropTypes.func.isRequired
}


export default EventInfoCard;