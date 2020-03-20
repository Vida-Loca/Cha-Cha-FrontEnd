import React from "react";
import "./Admin.scss";
import { Route, Redirect } from "react-router-dom";

import UserLayout from "./UsersTab";
import EventLayout from "./EventsTab";

const Admin = () => {
  return (
    <div className="admin-body">
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
