import React, { Component, useContext } from "react";
import { UserContext } from "../context/UserContext";
import OpeningLayout from "../layout/OpeningPageLayout";
import MainLayout from "./MainLayout/MainLayout";
import { authenticationService } from "../Authentication/service";

// eslint-disable-next-line react/prefer-stateless-function
class MyApplication extends Component {
  state = {
    isLoggedIn: false
  };

  componentDidUpdate() {
    var [user, setuser] = this.context;
    // console.log(user);
    if (user.break) {
      const currentU = authenticationService.CurrentUser();
      setuser({ ...user, break: false });
      if (currentU != null || user.isLoggedIn) {
        this.setState({
          isLoggedIn: true
        });
      } else {
        this.setState({
          isLoggedIn: false
        });
      }

      console.log("changed");
    }

    /* perform a side-effect at mount using the value of UserContext */
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? <MainLayout /> : <OpeningLayout />}
      </div>
    );
  }
}
MyApplication.contextType = UserContext;
export default MyApplication;
