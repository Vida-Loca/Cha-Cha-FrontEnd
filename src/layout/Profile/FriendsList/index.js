/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from "react";
import { FlashMessageContext } from "../../../context/FlashMessageContext";

import PaginatedContainer from "../../../components/PaginatedContainer";
import UserCard from "../../../components/UserCard";
import { Button } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import { userService } from "../../../Authentication/service";


// import { friends, friendsRequests } from "../../../mockData";

const FriendsList = () => {
  const [, setFlashMessage] = useContext(FlashMessageContext);

  const [friendList, setFriendList] = useState({ friends: [], spinner: true });
  const [friendRequests, setFriendRequests] = useState({ requests: [], spinner: true });

  useEffect(() => {
    let __isMounted = true;
    userService.getFriendsList()
      .then((res) => {
        if (__isMounted) {
          setFriendList({ friends: res, spinner: false });
        }
      });
    userService.getFriendRequestList()
      .then((res) => {
        if (__isMounted) {
          setFriendRequests({ requests: res, spinner: false });
        }
      }).catch(() => {
        if (__isMounted) {
          setFriendRequests({ requests: [], spinner: false });
        }
      });

    return () => {
      __isMounted = false;
    };
  }, []);

  const removeFromFriendsList = (userID, username) => {
    userService.removeFromFriends(userID)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        console.log("res", res);
        setFriendList({
          friends: friendList.friends.filter((user) => user.id !== userID),
          spinner: false,
        });
        setFlashMessage({
          message: `succesfuly removed ${username} from friends list`,
          show: true,
          messageState: "success",
        });
      })
      .catch((err) => {
        console.log("err", err);
        setFriendList({ ...friendList, spinner: false });
        setFlashMessage({
          message: `there has been a problem removing user ${username} from friends list`,
          show: true,
          messageState: "error",
        });
      });
  };
  const ignoreRequestFriendsList = (invitationId) => {
    userService.rejectInvite(invitationId)
      .then((res) => {
        console.log("res", res);
        setFriendRequests({
          requests: friendRequests.requests
            .filter((invitation) => invitation.invitor.id !== res.invitor.id),
          spinner: false,
        });
      })
      .catch((err) => {
        console.log("err", err);
        setFriendRequests({ ...friendRequests, spinner: false });
        setFlashMessage({
          message: "encoutered a problem",
          show: true,
          messageState: "warning",
        });
      });
  };
  const acceptFriendsList = (invitationId) => {
    userService.acceptInvite(invitationId)
      .then((res) => {
        console.log("res", res);
        const tempFriedsList = friendList.friends;
        const acceptFriendsInvitation = friendRequests.requests
          .filter((invitation) => invitation.invitor.id === res.relatedUserId)[0];
        tempFriedsList.push(acceptFriendsInvitation.invitor);
        setFriendRequests({
          requests: friendRequests.requests
            .filter((invitation) => invitation.invitor.id !== res.relatedUserId),
          spinner: false,
        });
        setFriendList({ friends: tempFriedsList, spinner: false });
        setFlashMessage({
          message: "accepted friend request",
          show: true,
          messageState: "success",
        });
      })
      .catch((err) => {
        console.log("err", err);
        setFriendList({ ...FriendsList, spinner: false });
        setFlashMessage({
          message: "there has been a problem accepting a friend request",
          show: true,
          messageState: "error",
        });
      });
  };

  return (
    <div>
      <PaginatedContainer
        title="Friends"
        items={friendList.friends}
        perPage={5}
        noContentMsg="empty friends list"
        render={
          friendList.spinner
            ? () => <Spinner />
            : ({ items }) => items.map((ev) => (
              <UserCard
                key={ev.username}
                username={ev.username}
                imageUrl={ev.picUrl}
                isBanned={ev.banned}
                showControlls
              >
                <Button clicked={() => removeFromFriendsList(ev.id, ev.username)} classes="btn-orangeGradient-icon btn-sm">
                  <i className="fas fa-user-minus" />
                </Button>
              </UserCard>
            ))
        }
      />
      <PaginatedContainer
        title="Friend Requests"
        items={friendRequests.requests}
        perPage={5}
        noContentMsg="no new requests"
        render={
          friendRequests.spinner
            ? () => <Spinner />
            : ({ items }) => items.map((ev) => (
              <UserCard
                key={ev.invitor.id}
                username={ev.invitor.username}
                imageUrl={ev.invitor.picUrl}
                isBanned={ev.invitor.banned}
                showControlls
              >
                <Button clicked={() => ignoreRequestFriendsList(ev.id)} classes="btn-orangeGradient-icon btn-sm">
                  <i className="fas fa-user-times" />
                </Button>
                <Button clicked={() => acceptFriendsList(ev.id)} classes="btn-blueGradient-icon btn-sm">
                  <i className="fas fa-user-plus" />
                </Button>
              </UserCard>
            ))
        }
      />
    </div>
  );
};

export default FriendsList;
