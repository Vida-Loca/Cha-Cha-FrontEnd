import React, { useState, useContext } from "react";
import { SearchBar } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { userService } from "../../../Authentication/service";
import PaginatedContainer from "../../../components/PaginatedContainer";
import UserCard from "../../../components/UserCard";
import Spinner from "../../../components/Spinner";

import { UserContext } from "../../../context/UserContext";
import { FlashMessageContext } from "../../../context/FlashMessageContext";
// import { friends } from "../../../mockData";

import "./inviteFriends.scss";

const SearchFriends = () => {
  const [findUser, setfindUser] = useState({ username: "" });
  const [friendsList, setFriendsList] = useState([]);
  const [dislpayFriends, setDislpayFreinds] = useState({ users: [], spinner: false });

  // eslint-disable-next-line comma-spacing
  const [loggedInUser] = useContext(UserContext);
  const [, setFlashMessage] = useContext(FlashMessageContext);

  const onChangeHandler = (event) => {
    setfindUser({
      ...findUser,
      [`${event.target.name}`]: event.target.value,
    });
  };

  const sendAFriendRequest = (id) => {
    userService.inviteUserByID(id)
      .then(() => {
        const newEl = dislpayFriends.users.map((user) => {
          if (user.id === id) {
            return { ...user, sent: true };
          }
          return user;
        });
        setDislpayFreinds({ users: newEl, spinner: false });
        setFlashMessage({
          message: "friend request sent",
          show: true,
          messageState: "success",
        });
      }, () => {
        setFlashMessage({
          message: "there is a problem with sending this friend request",
          show: true,
          messageState: "error",
        });
      });
  };

  const lookingForUsers = () => {
    userService.getFriendsList()
      .then((res) => {
        setFriendsList(res);
      }, () => {
        setFriendsList([]);
      });
    userService.getUsersByRegex(findUser.username)
      .then((res) => {
        const letfilteredUser = res.filter((user) => user.id !== loggedInUser.user.id);
        const addedSentParam = letfilteredUser.map((user) => ({ ...user, sent: false }));
        setDislpayFreinds({ users: addedSentParam, spinner: false });
        // setDislpayFreinds({ users: , spinner: false });
      }, () => {
        setDislpayFreinds({ users: [], spinner: false });
      });
  };

  return (
    <div className="invite-friends">
      <SearchBar
        onChange={onChangeHandler}
        placeholder="search ..."
        name="username"
        value={findUser.username}
        clicked={lookingForUsers}
      />
      <PaginatedContainer
        title=""
        items={dislpayFriends.users}
        perPage={5}
        noContentMsg=""
        render={
          dislpayFriends.spinner
            ? () => <Spinner size="spinner-sm" />
            : ({ items }) => items.map((ev) => {
              const isUserAFriend = friendsList.filter((user) => user.id === ev.id);
              return (
                <UserCard key={ev.id} username={ev.username} imageUrl={ev.picUrl} showControlls>
                  {!isUserAFriend.length > 0 && (
                    <Button clicked={() => sendAFriendRequest(ev.id)} classes="btn-blueGradient-icon btn-sm">
                      {
                        ev.sent
                          ? <i className="fas fa-check" />
                          : <i className="fas fa-user-plus" />
                      }
                    </Button>
                  )}
                </UserCard>
              );
            })
        }
      />
    </div>
  );
};

export default SearchFriends;
