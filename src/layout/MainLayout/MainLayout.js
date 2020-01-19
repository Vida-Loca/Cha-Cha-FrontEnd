import React, { useState, useContext } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import { FormContext } from "../../context/FormContext";
import Button from "../../components/button/Button";

import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Admin from "../Admin/Admin";
import Event from "../EventTabs/Event";
import TestComp from "../../testComponent/TestComp";
import { mainNav, adminNav, eventNav } from "./Navs";

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <BrowserRouter>
        <Sidebar classes="SideBar-orange" navlinks={mainNav} />
        <div>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/home" />} />
            <Route path="/home" exact render={() => <Home />} />
            <Route path="/profile" exact render={() => <Profile />} />
            <Route path="/admin" render={() => <Admin />} />

            <Route
              path="/event/:id"
              render={({ match }) => <Event match={match} />}
            />
          </Switch>
        </div>
        <Route
          path="/event/:id"
          render={({ match }) => (
            <Sidebar
              beforeLink={`/event/${match.params.id}`}
              classes="SideBar-darkBlue"
              navName="EventNav"
              navlinks={eventNav}
            />
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <Sidebar
              beforeLink="/admin"
              classes="SideBar-darkBlue"
              navName="EventNav"
              navlinks={adminNav}
            />
          )}
        />
      </BrowserRouter>
    </div>
  );
};

export default MainLayout;
