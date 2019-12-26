import React from "react";
import { Route } from "react-router-dom";
import Supply from "./Supply/Supply";
import Location from "./Location/Location";
import Members from "./Members/Members";

const Event = ({ openModal, match }) => {
  return (
    <div>
      <Route path={`${match.path}/suplies`} exact render={() => <Supply />} />
      <Route
        path={`${match.path}/location`}
        exact
        render={() => <Location />}
      />
      <Route path={`${match.path}/members`} exact render={() => <Members />} />
    </div>
  );
};

export default Event;
