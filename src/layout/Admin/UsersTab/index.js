import React, { useState, useEffect } from "react";
import { allUsers } from "../../../mockData";

import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/Inputs";
import PaginatedContainer from "../../../components/PaginatedContainer";
import Spinner from "../../../components/Spinner";
import UserCard from "../../../components/UserCard";
import "./UserLayout.scss";

const UsersLayout = () => {
  let __isMounted = false
  const [eventMemebers, seEventMemebers] = useState({ members: [], spinner: true });

  useEffect(() => {
    __isMounted = true;

    setTimeout(() => {
      if (__isMounted) {
        seEventMemebers({ members: allUsers, spinner: false });
      }

    }, 1000);
    return () => {
      __isMounted = false;
    };
  }, []);

  return (
    <div className="user-container">
      <div className="search-filters">
        <TextInput
          // onChange={onChangeHandler}
          placeholder="name"
          type="text"
          name="name"
          // value={searchFilter.name}
          classes="input-blue search-bar"
        />
        <Button classes="form-btn btn-blueGradient btn-sm search-btn">Search </Button>
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
                  <Button classes="btn-orangeGradient btn-sm">kick</Button>
                </UserCard>
              ))
        }
      />
    </div>
  );
};

export default UsersLayout;
