import React, { useState } from "react";
import "./Admin.scss";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import UserLayout from "./UsersLayout/UsersLayout";

const Admin = ({ openModal }) => {
  return (
    <div className="AdminLayoutBody">
      <Route
        path="/admin"
        exact
        render={() => <Redirect to="/admin/users" />}
      />
      <Route
        path="/admin/users"
        exact
        render={() => <UserLayout openModal={openModal} />}
      />
      <Route
        path="/admin/events"
        exact
        render={() => <div>admin event placeholder</div>}
      />
    </div>
  );
};

export default Admin;
