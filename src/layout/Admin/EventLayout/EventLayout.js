import React, { useState } from "react";
import AdminEventTile from "../../../components/AdminEventTile/AdminEventTile";
import { tempEvent } from "./Data/TempData";
import "./EventLayout.scss";

const EventLayout = ({ openModal }) => {
  const [events, setEvents] = useState(tempEvent);
  return (
    <div className="Users">
      {events.map(event => {
        return (
          <AdminEventTile
            key={event.id}
            id={event.id}
            openModal={openModal}
            name={event.name}
          />
        );
      })}
    </div>
  );
};

export default EventLayout;
