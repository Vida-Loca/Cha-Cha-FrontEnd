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
    userService.getFriendsList()
      .then(res => {
        if (__isMounted) {
          setFriendList({ friends: res, spinner: false });
          setDislpayFreinds({ friends: res, spinner: false });
        }
      }).catch(err => {
        if (__isMounted) {
          console.log(err);
          setFriendList({ friends: [], spinner: false });
          setDislpayFreinds({ friends: [], spinner: false });
        }
      });

    return () => {
      __isMounted = false;
    };
  }, []);

  const onChangeHandler = event => {
    setfindUser({
      ...findUser,
      [`${event.target.name}`]: event.target.value
    });
    const foundUsers = friendsList.friends.filter(user => user.username.includes(findUser.username));
    foundUsers.length !== 0 && findUser.username.length > 1
      ? setDislpayFreinds({ ...dislpayFriends, friends: foundUsers })
      : setDislpayFreinds({ ...dislpayFriends, friends: friendsList.friends });
  };


  const sendInvitation = (userId) => {
    eventService.inviteUserToAnEvent(id, userId)
      .then(_ => {
        setDislpayFreinds({ friends: dislpayFriends.friends.filter(prod => prod.id !== userId), spinner: false })
      }, err => {
        console.log(err);
      });
  }

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
            : ({ items }) =>
              items.map(ev => (
                <UserCard key={ev.username} username={ev.username} imageUrl={ev.picUrl} showControlls>
                  <Button clicked={() => sendInvitation(ev.id)} classes="btn-blueGradient btn-sm">invite</Button>
                </UserCard>
              ))
        }
      />
    </div>
  );
};


InviteUserFormContainer.propTypes = {
  id: PropTypes.string.isRequired
};


export default InviteUserFormContainer;
