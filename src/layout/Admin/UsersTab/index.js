import React, { useState, useContext, useEffect } from "react";
import { FormContext } from "../../../context/FormContext";
import { allUsers } from "../../../mockData";

import { Button } from "../../../components/Button";
import { SearchBar, TextInput } from "../../../components/Inputs";
import PaginatedContainer from "../../../components/PaginatedContainer";
import Spinner from "../../../components/Spinner";
import UserCard from "../../../components/UserCard";
import UserProfile from "./UserProfile";
import "./Users.scss";

const UsersLayout = () => {
  const [findUser, setFindUser] = useState({ username: "" });
  const [eventMemebers, seEventMemebers] = useState({ members: [], spinner: true });
  const [, setform] = useContext(FormContext);

  useEffect(() => {
    let __isMounted = true;

    setTimeout(() => {
      if (__isMounted) {
        seEventMemebers({ members: allUsers, spinner: false });
      }

    }, 1000);
    return () => {
      __isMounted = false;
    };
  }, []);

  const openUserProfileModal = () => {
    setform({ show: true, renderForm: <UserProfile /> });
  };

  const onChangeHandler = event => {
    setFindUser({
      ...findUser,
      [`${event.target.name}`]: event.target.value
    });
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
          onChange={onChangeHandler}
          placeholder="username"
          name="username"
          value={findUser.username}
          clicked={searchForGivenUsername}
        />
      </div>
      <PaginatedContainer
        title={`Members ● ${eventMemebers.members.length}`}
        items={eventMemebers.members}
        perPage={10}
        render={
          eventMemebers.spinner
            ? () => <Spinner />
            : ({ items }) =>
              items.map(ev => (
                <UserCard imageUrl={ev.image} key={ev.username} username={ev.username} showControlls={true}>
                  <Button clicked={() => openUserProfileModal(ev.username)} classes="btn-blueGradient btn-sm">profile</Button>
                </UserCard>
              ))
        }
      />
    </div>
  );
};

export default UsersLayout;
