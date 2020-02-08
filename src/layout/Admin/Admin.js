import React from "react";
import "./Admin.scss";
import { Route, Redirect } from "react-router-dom";

import UserLayout from "./UsersLayout/UsersLayout";
import EventLayout from "./EventLayout/EventLayout";

const Admin = () => {
  return (
    <div className="AdminLayoutBody">
      <Route
        path="/admin"
        exact
        render={() => <Redirect to="/admin/users" />}
      />
      <Route path="/admin/users" exact render={() => <UserLayout />} />
      <Route path="/admin/events" exact render={() => <EventLayout />} />
    </div>
  );
};

export default Admin;
