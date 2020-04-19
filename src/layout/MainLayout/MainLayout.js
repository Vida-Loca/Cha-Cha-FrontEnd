import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { mainNav, adminNav, eventNav, adminEventNav, mainNavNoAdmin } from "./Navs";
import { adminService, eventService, profileService } from "../../Authentication/service";
import { UserContext } from "../../context/UserContext";
import "./Layout.scss";

import Sidebar from "../../components/Sidebar";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Admin from "../Admin/Admin";
import Event from "../EventTabs/Event";


const MainLayout = () => {
  const [loggedinUser, setLoggedInUser] = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    let _isMounted = true;

    Promise.all([adminService.isLoggedInUserAdmin(), profileService.getCurrentUserInfo()])
      .then(res => {
        if (_isMounted) {
          setLoggedInUser({ user: res[1], isAdmin: res[0] });
        }
      }).catch(err => {
        console.log(err);
      })


    // adminService
    //   .isLoggedInUserAdmin()
    //   .then(res => {
    //     if (_isMounted) {
    //       setIsAdmin(res);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });


    // profileService.getCurrentUserInfo()
    //   .then(res => {
    //     if (_isMounted) {
    //       setLoggedInUser({ user: res });
    //     }
    //   }, err => {
    //     console.log(err);
    //   })
    return () => {
      _isMounted = false;
    }
  }, []);

  const checkIfUserIsAuthorized = (eventId) => {
    eventService.isCurrentUserAdminOfEvent(eventId)
      .then(res => {
        // console.log(res);
        return res;
      }, err => {
        console.log(err);
        return false;
      });
  }

  return (
    <div className="MainLayout">
      <Sidebar classes="SideBar-orange" navlinks={loggedinUser.isAdmin ? mainNav : mainNavNoAdmin} />

      <Switch>
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route path="/home" exact render={() => <Home />} />
        <Route path="/profile" exact render={() => <Profile />} />
        {loggedinUser.isAdmin ? <Route path="/admin" render={() => <Admin />} /> : null}

        <Route
          path="/event/:id"
          render={({ match }) => <Event eventId={match.params.id} eventPath={match.path} />}
        />
        <Redirect from="*" to="/home" />
      </Switch>
      <Route
        path="/event/:id"
        render={({ match }) => (
          <Sidebar beforeLink={`/event/${match.params.id}`} classes="SideBar-darkBlue" navlinks={adminEventNav} />
        )}
      />
      {loggedinUser.isAdmin ? (
        <Route
          path="/admin"
          render={() => <Sidebar beforeLink="/admin" classes="SideBar-darkBlue" navlinks={adminNav} />}
        />
      ) : null}
    </div>
  );
};

export default MainLayout;
