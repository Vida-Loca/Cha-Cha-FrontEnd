import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Modal from "../components/Modal/Modal";
import { FormContext } from "../context/FormContext";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";

const MainLayout = () => {
  const changedForm = useContext(FormContext)[0];

  const [mainState, mainStateSet] = useState({
    show: false,
    mainNav: [
      { navLink: "Home", iconClass: "fas fa-home" },
      { navLink: "Profile", iconClass: "fas fa-user-alt" },
      { navLink: "Admin", iconClass: "fas fa-user-shield" }
    ],
    eventNav: [
      { navLink: "Suplies", iconClass: "fas fa-box-open" },
      { navLink: "Location", iconClass: "fas fa-map-marker-alt" },
      { navLink: "Members", iconClass: "fas fa-users" },
      { navLink: "Photos", iconClass: "fas fa-images" },
      { navLink: "Forum", iconClass: "fas fa-comments" },
      { navLink: "Games", iconClass: "fas fa-gamepad" }
    ]
  });

  const hideModal = () => {
    mainStateSet({ ...mainState, show: false });
  };
  const showModal = () => {
    mainStateSet({ ...mainState, show: true });
  };

  return (
    <div className="MainLayout">
      <Modal show={mainState.show} modalClose={hideModal}>
        {changedForm.renderForm}
      </Modal>

      <BrowserRouter>
        <Sidebar classes="SideBar-orange" navlinks={mainState.mainNav} />
        <div>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route
            path="/home"
            exact
            render={() => <Home openModal={showModal} />}
          />
          <Route
            path="/profile"
            exact
            render={() => <Profile openModal={showModal} />}
          />
          <Route path="/admin" exact render={() => <h1>this is Admin</h1>} />
          <Route
            path="/suplies"
            exact
            render={() => <h1>this is Suplies</h1>}
          />
          <Route
            path="/location"
            exact
            render={() => <h1>this is Location</h1>}
          />
          <Route
            path="/members"
            exact
            render={() => <h1>this is Memebrs</h1>}
          />
          <Route path="/photos" exact render={() => <h1>this is Photos</h1>} />
          <Route path="/forum" exact render={() => <h1>this is Forum</h1>} />
          <Route path="/games" exact render={() => <h1>this is Games</h1>} />
        </div>
        <Sidebar
          classes="SideBar-darkBlue"
          navName="EventNav"
          navlinks={mainState.eventNav}
        />
      </BrowserRouter>
    </div>
  );
};

export default MainLayout;
