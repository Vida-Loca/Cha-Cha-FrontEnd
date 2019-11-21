import React from "react";
import "./EventCard.scss";

const eventCard = () => {
  return (
    <div className="Event-Card">
      <div className="eventIcon">
        <i className="fas fa-glass-cheers" />
      </div>
      <div className="content">
        <h2>Ny party</h2>
        <span>
          <i className="fas fa-calendar-alt" />
          10-10-2020
        </span>
        <span>
          <i className="fas fa-map-marker-alt" />
          Locaion, Location
        </span>
      </div>
      <i className="fas fa-arrow-circle-right" />
    </div>
  );
};
export default eventCard;
