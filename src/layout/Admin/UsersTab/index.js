import React, { useState, useContext, useEffect } from "react";
import { FormContext } from "../../../context/FormContext";
// import { allUsers } from "../../../mockData";
import { adminService } from "../../../Authentication/service";

import { Button } from "../../../components/Button";
import { SearchBar } from "../../../components/Inputs";
import PaginatedContainer from "../../../components/PaginatedContainer";
import Spinner from "../../../components/Spinner";
import UserCard from "../../../components/UserCard";
import UserProfile from "./UserProfile";
import "./Users.scss";

const UsersLayout = () => {
  const [findUser, setFindUser] = useState({ username: "" });
  const [eventMemebers, seEventMemebers] = useState({ members: [], spinner: true });
  const [dislpayUsers, setDislpayUsers] = useState({ members: [], spinner: true });
  const [, setform] = useContext(FormContext);

  useEffect(() => {
    let __isMounted = true;
    adminService.getAllUsers()
      .then(res => {
        if (__isMounted) {
          seEventMemebers({ members: res, spinner: false });
          setDislpayUsers({ members: res, spinner: false });
        }
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      __isMounted = false;
    };
  }, []);

  const handleSearch = (event) => {
    setFindUser({
      ...findUser,
      [`${event.target.name}`]: event.target.value
    });
    let searchQuery = event.target.value.toLowerCase();
    let displayUsers = eventMemebers.members.filter((el) => {
      let searchValue = el.username.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    setDislpayUsers({ ...dislpayUsers, members: displayUsers })

  }


  const openUserProfileModal = (userDetails) => {
    setform({ show: true, renderForm: <UserProfile userDetails={userDetails} /> });
  };



  const searchForGivenUsername = () => {
    if (findUser.username !== "") {
      console.log(`searching for ... ${findUser.username}`);
      seEventMemebers({ ...eventMemebers, spinner: true });
      setTimeout(() => {
        seEventMemebers({ ...eventMemebers, spinner: false });
      }, 1000);
    }
  }

  return (
    <div className="user-container">
      <div className="search-filters">
        <SearchBar
          onChange={handleSearch}
          placeholder="username"
          name="username"
          value={findUser.username}
          clicked={searchForGivenUsername}
        />
      </div>
      <PaginatedContainer
        title={`Members ● ${eventMemebers.members.length}`}
        items={dislpayUsers.members}
        perPage={10}
        render={
          dislpayUsers.spinner
            ? () => <Spinner />
            : ({ items }) =>
              items.map(ev => (
                <UserCard
                  imageUrl={ev.picUrl}
                  key={ev.username}
                  username={ev.username}
                  showControlls={true}
                  clicked={() => openUserProfileModal(ev)}>
                </UserCard>
              ))
        }
      />
    </div>
  );
};

export default UsersLayout;
