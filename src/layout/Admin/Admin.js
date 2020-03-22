import React from "react";
import { Route, Redirect } from "react-router-dom";

import UserLayout from "./UsersTab";
import EventLayout from "./EventsTab";
import "./Admin.scss";


const Admin = () => {
  return (
    <div className="admin-container">
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
