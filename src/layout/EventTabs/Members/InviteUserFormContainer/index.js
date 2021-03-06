/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";
import { userService, eventService } from "../../../../Authentication/service";
import PaginatedContainer from "../../../../components/PaginatedContainer";
import UserCard from "../../../../components/UserCard";
// import { friends } from "../../../../mockData";
import Spinner from "../../../../components/Spinner";

import "./inviteFriends.scss";

const InviteUserFormContainer = ({ id }) => {
  const [findUser, setfindUser] = useState({ username: "" });
  const [friendsList, setFriendList] = useState({ friends: [], spinner: true });
  const [dislpayFriends, setDislpayFreinds] = useState({ friends: [], spinner: true });

  useEffect(() => {
    let __isMounted = true;
    Promise.all([
      userService.getFriendsList(),
      eventService.getEventMembers(id),
      eventService.getEventPendingInvitations(id),
    ])
      .then((res) => {
        const filteredUsers = res[0]
          .filter((el) => !res[1].find((member) => member.id === el.id))
          .filter((el) => !res[2].find((member) => member.user.id === el.id));
        if (__isMounted) {
          setFriendList({ friends: filteredUsers, spinner: false });
          setDislpayFreinds({ friends: filteredUsers, spinner: false });
        }
      }).catch(() => {
        if (__isMounted) {
          setFriendList({ friends: [], spinner: false });
          setDislpayFreinds({ friends: [], spinner: false });
        }
      });

    return () => {
      __isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (event) => {
    setfindUser({
      ...findUser,
      [`${event.target.name}`]: event.target.value,
    });
    const foundUsers = friendsList.friends
      .filter((user) => user.username.includes(findUser.username));

    // eslint-disable-next-line no-unused-expressions
    foundUsers.length !== 0 && findUser.username.length > 1
      ? setDislpayFreinds({ ...dislpayFriends, friends: foundUsers })
      : setDislpayFreinds({ ...dislpayFriends, friends: friendsList.friends });
  };


  const sendInvitation = (userId) => {
    eventService.inviteUserToAnEvent(id, userId)
      .then(() => {
        setDislpayFreinds({
          friends: dislpayFriends.friends.filter((prod) => prod.id !== userId),
          spinner: false,
        });
      })
      .catch(() => {});
  };

  return (
    <div className="invite-friends">
      <TextInput onChange={onChangeHandler} placeholder="Username" classes="input-blue" name="username" />
      <PaginatedContainer
        title="Invite friends"
        items={dislpayFriends.friends}
        perPage={5}
        render={
          dislpayFriends.spinner
            ? () => <Spinner />
            : ({ items }) => items.map((ev) => (
              <UserCard
                key={ev.username}
                isBanned={ev.banned}
                username={ev.username}
                imageUrl={ev.picUrl}
                showControlls
              >
                <Button clicked={() => sendInvitation(ev.id)} classes="btn-blueGradient btn-sm">invite</Button>
              </UserCard>
            ))
        }
      />
    </div>
  );
};


InviteUserFormContainer.propTypes = {
  id: PropTypes.string.isRequired,
};


export default InviteUserFormContainer;
