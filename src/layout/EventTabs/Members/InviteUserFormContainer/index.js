import React, { useState, useContext } from "react";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";
import { userService } from "../../../../Authentication/service";
import { FormContext } from "../../../../context/FormContext";
// import { UserContext } from "../../../../context/UserContext";

const InviteUserFormContainer = id => {
  const [forms, setForm] = useContext(FormContext);

  const [findUser, setfindUser] = useState({ username: "" });

  const onChangeHandler = event => {
    setfindUser({
      ...findUser,
      [`${event.target.name}`]: event.target.value
    });
    console.log(findUser);
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

  return (
    <div>
      <TextInput
        onChange={onChangeHandler}
        placeholder="Username"
        name="username"
      />
      <Button clicked={inviteUserPost} classes="btn-blueGradient btn-md">
        send and invite
      </Button>
    </div>
  );
};

export default InviteUserFormContainer;
