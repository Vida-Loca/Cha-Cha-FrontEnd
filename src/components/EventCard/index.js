import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./EventCard.scss";

const EventCard = ({ id, name, date, location, eventState, listIndex }) => {

  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowCard(true);
    }, listIndex * 100);
  }, [])

  const iconState = () => {
    switch (eventState) {
      case "ongoing":
        return "fas fa-sync-alt"
      case "finished":
        return "fas fa-check"
      case "invite":
        return "fas fa-envelope"
      default:
        return "";
    }
  }
  const cardStyle = () => {
    switch (eventState) {
      case "ongoing":
        return `event-card event-card-animation-1`
      case "finished":
        return `event-card event-card-animation-1 event-complete`
      case "invite":
        return `event-card event-card-animation-1 event-invite`
      default:
        return "";
    }
  }
  return (
    <Link to={`/event/${id}`}>

      {showCard
        && <div className={cardStyle()}>
          <div className={"event-icon event-icon-complete"}>
            <i className={iconState()} />
          </div>
          <div className="content">
            <h2>{name}</h2>
            <span className="date-cont">
              <i className="fas fa-calendar-alt" />
              <span className="date">{!!date ? date.substring(0, 10) : ""}</span>
              <strong className="event-state">{eventState}</strong>
            </span>
            <span>
              <i className="fas fa-map-marker-alt" />
              {`${location.city}, ${location.street}`}
            </span>
          </div>
        </div>}

    </Link>
  );
};

EventCard.defaultProps = {
  eventState: "ongoing"
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  eventState: PropTypes.oneOf(["ongoing", "finished", "invite"])
};

export default EventCard;
