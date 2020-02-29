import React, { useState } from "react";
import AdminEventTile from "../../../components/AdminEventTile/AdminEventTile";
import { allEvents } from "../../../mockData";
import "./EventLayout.scss";

const EventLayout = () => {
  const events = useState(allEvents)[0];
  return (
    <div className="Users">
      {events.map(event => {
        return (
          <AdminEventTile key={event.id} id={event.id} name={event.name} />
        );
      })}
    </div>
  );
};

export default EventLayout;
