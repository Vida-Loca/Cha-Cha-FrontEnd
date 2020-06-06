/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from "react";
import { FormContext } from "../../../context/FormContext";

// import { allUsers } from "../../../mockData";
import { adminService } from "../../../Authentication/service";

import { SearchBar } from "../../../components/Inputs";
import PaginatedContainer from "../../../components/PaginatedContainer";
import Spinner from "../../../components/Spinner";
import UserCard from "../../../components/UserCard";
import UserProfile from "./UserProfile";
import "./Users.scss";

const UsersLayout = () => {
  const [findUser, setFindUser] = useState({ username: "" });
  const [users, setUsers] = useState({ members: [], spinner: true });
  const [admins, setAdmins] = useState({ members: [], spinner: true });
  const [dislpayUsers, setDislpayUsers] = useState({ members: [], spinner: true });
  const [, setform] = useContext(FormContext);


  useEffect(() => {
    let __isMounted = true;
    Promise.all([adminService.getAllUsers(), adminService.getAllAdmins()])
      .then((res) => {
        if (__isMounted) {
          const usersList = res[0]
            .filter((user) => res[1]
              .findIndex((userT) => userT.id === user.id) < 0);
          setUsers({ members: usersList, spinner: false });
          setDislpayUsers({ members: usersList, spinner: false });
          setAdmins({ members: res[1], spinner: false });
        }
      })
      .catch(() => {});

    return () => {
      __isMounted = false;
    };
  }, []);

  const handleSearch = (event) => {
    setFindUser({
      ...findUser,
      [`${event.target.name}`]: event.target.value,
    });
    const searchQuery = event.target.value.toLowerCase();
    const displayUsers = users.members.filter((el) => {
      const searchValue = el.username.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    setDislpayUsers({ ...dislpayUsers, members: displayUsers });
  };

  const removeUserFromList = (userId) => {
    let tempListOfUser = users.members;
    tempListOfUser = tempListOfUser.filter((user) => user.id !== userId);
    setUsers({ ...users, memebers: tempListOfUser });
    setDislpayUsers({ members: tempListOfUser, spinner: false });
  };
  const banUserInList = (userId, isban) => {
    let tempListOfUser = users.members;
    tempListOfUser = tempListOfUser.map((user) => {
      if (user.id === userId) {
        return { ...user, banned: isban };
      }
      return user;
    });
    setUsers({ ...users, memebers: tempListOfUser });
    setDislpayUsers({ members: tempListOfUser, spinner: false });
  };

  const promoteToAdminInList = (userId) => {
    const tempListOfUser = users.members;
    const indexOfUser = tempListOfUser.findIndex((user) => user.id === userId);
    if (indexOfUser > -1) {
      const adminList = admins.members;
      adminList.push(tempListOfUser[indexOfUser]);
      setAdmins({ ...admins, memebers: adminList });
    }
    removeUserFromList(userId);
  };


  const openUserProfileModal = (userDetails, isAdmin) => {
    setform({
      show: true,
      renderForm:
  <UserProfile
    isAdmin={isAdmin}
    promoteToAdminInList={promoteToAdminInList}
    banUserInList={banUserInList}
    removeUserFromList={removeUserFromList}
    userDetails={userDetails}
  />,
    });
  };


  const searchForGivenUsername = () => {
    if (findUser.username !== "") {
      setUsers({ ...users, spinner: true });
      setTimeout(() => {
        setUsers({ ...users, spinner: false });
      }, 1000);
    }
  };

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
        title={`Admins ● ${admins.members.length}`}
        items={admins.members}
        perPage={10}
        render={
          admins.spinner
            ? () => <Spinner />
            : ({ items }) => items.map((ev) => (
              <UserCard
                imageUrl={ev.picUrl}
                key={ev.username}
                username={ev.username}
                showControlls
                clicked={() => openUserProfileModal(ev, true)}
              />

            ))
        }
      />
      <PaginatedContainer
        title={`Members ● ${users.members.length}`}
        items={dislpayUsers.members}
        perPage={10}
        render={
          dislpayUsers.spinner
            ? () => <Spinner />
            : ({ items }) => items.map((ev) => (
              <UserCard
                imageUrl={ev.picUrl}
                key={ev.username}
                username={ev.username}
                showControlls
                clicked={() => openUserProfileModal(ev, false)}
              />

            ))
        }
      />

    </div>
  );
};

export default UsersLayout;
