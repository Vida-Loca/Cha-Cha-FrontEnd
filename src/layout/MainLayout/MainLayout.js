import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { mainNav, adminNav, eventNav, mainNavNoAdmin } from "./Navs";
import { profileService } from "../../Authentication/service";


import "./Layout.scss";

import Sidebar from "../../components/Sidebar";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Admin from "../Admin/Admin";
import Event from "../EventTabs/Event";

const MainLayout = () => {
  const [isUserAdmin, setUserAdmin] = useState(false);
  useEffect(() => {
    profileService
      .isLoggedInUserAdmin()
      .then(res => {
        setUserAdmin(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="MainLayout">
      <BrowserRouter>
        <Sidebar classes="SideBar-orange" navlinks={isUserAdmin ? mainNav : mainNavNoAdmin} />
        <>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/home" />} />
            <Route path="/home" exact render={() => <Home />} />
            <Route path="/profile" exact render={() => <Profile />} />
            {isUserAdmin ? <Route path="/admin" render={() => <Admin />} /> : null}

            <Route
              path="/event/:id"
              render={({ match }) => <Event eventId={match.params.id} eventPath={match.path} />}
            />
            <Redirect from="*" to="/home" />
          </Switch>
        </>
        <Route
          path="/event/:id"
          render={({ match }) => (
            <Sidebar beforeLink={`/event/${match.params.id}`} classes="SideBar-darkBlue" navlinks={eventNav} />
          )}
        />
        {isUserAdmin ? (
          <Route
            path="/admin"
            render={() => <Sidebar beforeLink="/admin" classes="SideBar-darkBlue" navlinks={adminNav} />}
          />
        ) : null}
      </BrowserRouter>
    </div>
  );
};

export default MainLayout;
