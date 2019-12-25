import React from "react";
import { Route } from "react-router-dom";
import Supply from "./Supply/Supply";
import Location from "./Location/Location";
import Members from "./Members/Members";

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
        render={() => <Members openModal={openModal} />}
      />
    </div>
  );
};

export default Event;
