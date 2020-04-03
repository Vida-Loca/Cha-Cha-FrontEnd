import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";
import { userService, eventService } from "../../../../Authentication/service";
// import { FormContext } from "../../../../context/FormContext";
import PaginatedContainer from "../../../../components/PaginatedContainer";
import UserCard from "../../../../components/UserCard";
import { friends } from "../../../../mockData";
import Spinner from "../../../../components/Spinner";

import "./inviteFriends.scss";


const InviteUserFormContainer = id => {
  // const [forms, setForm] = useContext(FormContext);

  const [findUser, setfindUser] = useState({ username: "" });
  const [dislpayFriends, setDislpayFreinds] = useState({ friends: [], spinner: true });

  useEffect(() => {

    userService.getAllUsers()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    setTimeout(() => {
      setDislpayFreinds({ friends: friends, spinner: false });
    }, 1000);
    return () => { };
  }, []);

  const onChangeHandler = event => {
    setfindUser({
      ...findUser,
      [`${event.target.name}`]: event.target.value
    });
    const foundUsers = friends.filter(o => o.username.includes(findUser.username));
    foundUsers.length !== 0 && findUser.username.length > 1
      ? setDislpayFreinds(foundUsers)
      : setDislpayFreinds(friends);
  };



  const sendInvitation = (username) => {
    const tempFriendsList = dislpayFriends.friends;
    setDislpayFreinds({ friends: dislpayFriends.friends.filter(prod => prod.username !== username), spinner: false })
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
                <UserCard key={ev.username} username={ev.username} imageUrl={ev.avatarUrl} showControlls>
                  <Button clicked={() => sendInvitation(ev.username)} classes="btn-blueGradient btn-sm">invite</Button>
                </UserCard>
              ))
        }
      />
    </div>
  );
};


InviteUserFormContainer.propTypes = {
  id: PropTypes.number.isRequired
};


export default InviteUserFormContainer;
