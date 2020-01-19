import React, { Component, useContext } from "react";
import { UserContext } from "../context/UserContext";
import OpeningLayout from "../layout/OpeningPageLayout";
import MainLayout from "./MainLayout/MainLayout";

// eslint-disable-next-line react/prefer-stateless-function
class MyApplication extends Component {
  state = {
    isLoggedIn: true
  };

  componentDidUpdate() {
    var [user, setuser] = this.context;
    // console.log(user);
    if (user.break) {
      setuser({ ...user, break: false });
      this.setState({
        isLoggedIn: user.isLoggedIn
      });
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
