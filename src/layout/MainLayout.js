import React, { useState, useContext } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Modal from "../components/Modal/Modal";
import { FormContext } from "../context/FormContext";
import Button from "../components/button/Button";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Admin from "./Admin/Admin";
import Event from "./EventTabs/Event";

const MainLayout = () => {
  const [changedForm, setChangedForm] = useContext(FormContext);

  const mainState = useState({
    mainNav: [
      { navLink: "Home", iconClass: "fas fa-home" },
      { navLink: "Profile", iconClass: "fas fa-user-alt" },
      { navLink: "Admin", iconClass: "fas fa-user-shield" }
    ],
    adminNav: [
      { navLink: "Users", iconClass: "fas fa-home" },
      { navLink: "Events", iconClass: "fas fa-user-alt" }
    ],
    eventNav: [
      {
        navLink: "Suplies",
        iconClass: "fas fa-box-open"
      },
      {
        navLink: "Location",
        iconClass: "fas fa-map-marker-alt"
      },
      {
        navLink: "Members",
        iconClass: "fas fa-users"
      }
    ]
  })[0];

  const hideModal = () => {
    setChangedForm({ ...changedForm, show: false });
  };
  const showModal = () => {
    setChangedForm({ ...changedForm, show: true });
  };
  // const openNav = () => {

  // }

  return (
    <div className="MainLayout">
      <Modal show={changedForm.show} modalClose={hideModal}>
        {changedForm.renderForm}
      </Modal>

      <BrowserRouter>
        <Sidebar classes="SideBar-orange" navlinks={mainState.mainNav} />
        <div>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/home" />} />
            <Route path="/home" exact render={() => <Home />} />
            <Route path="/profile" exact render={() => <Profile />} />
            <Route path="/admin" render={() => <Admin />} />
            <Route
              path="/event/:id"
              render={({ match }) => (
                <Event match={match} openModal={showModal} />
              )}
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
              navlinks={mainState.eventNav}
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
              navlinks={mainState.adminNav}
            />
          )}
        />
      </BrowserRouter>
    </div>
  );
};

export default MainLayout;
