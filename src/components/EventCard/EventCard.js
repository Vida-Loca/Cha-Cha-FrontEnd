import React from "react";
import PropTypes from "prop-types";
import "./EventCard.scss";

const EventCard = ({ name, date, location }) => {
  return (
    <div className="Event-Card">
      <div className="eventIcon">
        <i className="fas fa-glass-cheers" />
      </div>
      <div className="content">
        <h2>{name}</h2>
        <span>
          <i className="fas fa-calendar-alt" />
          {date}
        </span>
        <span>
          <i className="fas fa-map-marker-alt" />
          {location}
        </span>
      </div>
      <i className="fas fa-arrow-circle-right" />
    </div>
  );
};

EventCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default EventCard;
