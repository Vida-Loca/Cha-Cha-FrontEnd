import React from "react";
import { Route } from "react-router-dom";
import Supply from "./Supply/Supply";
import Location from "./Location/Location";

const Event = ({ openModal, match }) => {
  return (
    <div>
      <Route
        path={`${match.path}/suplies`}
        exact
        render={() => <Supply openModal={openModal} />}
      />
      <Route
        path={`${match.path}/location`}
        exact
        render={() => <Location openModal={openModal} />}
      />
      <Route
        path={`${match.path}/members`}
        exact
        render={() => <h1>this is Memebrs</h1>}
      />
    </div>
  );
};

export default Event;
