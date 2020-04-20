import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { mainNav, adminNav, adminEventNav, mainNavNoAdmin } from "./Navs";
import { adminService, profileService } from "../../Authentication/service";
import { UserContext } from "../../context/UserContext";
import "./Layout.scss";

import Sidebar from "../../components/Sidebar";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Admin from "../Admin/Admin";
import Event from "../EventTabs/Event";


const MainLayout = () => {
  const [loggedinUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    let _isMounted = true;
    Promise.all([adminService.isLoggedInUserAdmin(), profileService.getCurrentUserInfo()])
      .then(res => {
        if (_isMounted) {
          setLoggedInUser({ ...loggedinUser, user: res[1], isAdmin: res[0] });
        }
      }).catch(err => {
        console.log(err);
      })

    return () => {
      _isMounted = false;
    }
  }, []);

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
        <Route render={() => <Redirect to="/home" />} />
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
