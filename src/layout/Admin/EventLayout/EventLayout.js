import React, { useState } from "react";
import AdminEventTile from "../../../components/AdminEventTile/AdminEventTile";
import { tempEvent } from "./Data/TempData";
import "./EventLayout.scss";

const EventLayout = () => {
  const events = useState(tempEvent)[0];
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
