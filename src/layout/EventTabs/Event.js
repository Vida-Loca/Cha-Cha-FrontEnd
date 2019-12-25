import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Supply from "./Supply/Supply";
import Location from "./Location/Location";

const Event = ({ openModal }) => {
  return (
    <div>
      <Route
        path="/event/:id/suplies"
        exact
        render={() => <Supply openModal={openModal} />}
      />
      <Route
        path="/event/:id/location"
        exact
        render={() => <Location openModal={openModal} />}
      />
      <Route
        path="/event/:id/members"
        exact
        render={() => <h1>this is Memebrs</h1>}
      />
    </div>
  );
};

export default Event;
