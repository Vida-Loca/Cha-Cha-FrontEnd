import React, { useState, useContext, useEffect } from "react";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";
import { userService } from "../../../../Authentication/service";
import { FormContext } from "../../../../context/FormContext";
import PaginatedContainer from "../../../../components/PaginatedContainer";
import UserCard from "../../../../components/UserCard";
import { friends } from "../../../../mockData";

import "./inviteFriends.scss";


const InviteUserFormContainer = id => {
  const [forms, setForm] = useContext(FormContext);

  const [findUser, setfindUser] = useState({ username: "" });
  const [dislpayFriends, setDislpayFreinds] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setDislpayFreinds(friends);
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
    // console.log(friends.filter(o => o.username.includes(findUser.username)));
  };

  const inviteUserPost = event => {
    event.preventDefault();
    userService
      .inviteUserTOEvent(id, findUser.username)
      .then(body => {
        return body;
      })
      .then(res => {
        console.log(res);
        setForm({ ...forms, show: false });
        // setEventsList(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sendInvitation = (username) => {
    setTimeout(() => {
      console.log(`sendding request to ... ${username}`)
    }, 2000);
  }

  return (
    <div className="invite-friends">
      <TextInput onChange={onChangeHandler} placeholder="Username" classes="input-blue" name="username" />
      <PaginatedContainer
        title="Invite friends"
        items={dislpayFriends}
        perPage={5}
        render={({ items }) =>
          items.map(ev => (
            <UserCard key={ev.username} username={ev.username} showControlls>
              <Button clicked={() => sendInvitation(ev.username)} classes="btn-blueGradient btn-sm">invite</Button>
            </UserCard>
          ))
        }
      />
    </div>
  );
};

export default InviteUserFormContainer;
