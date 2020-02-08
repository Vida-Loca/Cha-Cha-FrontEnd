import React, { useState, useContext, useEffect } from "react";
// import { UserContext } from "../context/UserContext";
import SplashScreen from "./SplashScreen/SplashScreen";
import MainLayout from "./MainLayout/MainLayout";
// import { authenticationService } from "../Authentication/service";

const MyApplication = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  // const [isUser, setUser] = useState(true);

  // useEffect(() => {
  //   if (isUser.break) {
  //     const currentU = authenticationService.CurrentUser();
  //     setUser({ ...isUser, break: false });
  //     if (currentU != null || isUser.isLoggedIn) {
  //       setLoggedIn({
  //         isLoggedIn: true
  //       });
  //     } else {
  //       setLoggedIn({
  //         isLoggedIn: false
  //       });
  //     }
  //   }
  //   return () => {
  //     console.log("unoounted ");
  //   };
  // }, []);

  return (
    <div className="App">{isLoggedIn ? <MainLayout /> : <SplashScreen />}</div>
  );
};

export default MyApplication;
