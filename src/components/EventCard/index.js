import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./EventCard.scss";

const EventCard = ({ id, name, date, location, eventState }) => {
  return (
    <Link to={`/event/${id}/suplies`}>
      <div className={eventState ? "Event-Card Event-Complete" : "Event-Card"}>
        <div
          className={eventState ? "eventIcon eventIcon-complete" : "eventIcon"}
        >
          <i className={eventState ? "fas fa-check" : "fas fa-sync-alt"} />
        </div>
        <div className="content">
          <h2>{name}</h2>
          <span>
            <i className="fas fa-calendar-alt" />
            {date}
          </span>
          <span>
            <i className="fas fa-map-marker-alt" />
            {`${location.city}, ${location.street}, ${location.number}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

EventCard.defaultProps = {
  eventState: false
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  eventState: PropTypes.bool
};

export default EventCard;
