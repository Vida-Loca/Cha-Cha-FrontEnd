import React, { useState } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";

const ChangeAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState({ URL: "" });
  const onChangeHandler = event => {
    setAvatarUrl({
      ...avatarUrl,
      [`${event.target.name}`]: event.target.value
    });
  };

  const changeAvatar = () => {
    if (avatarUrl.URL.length > 5) {
      setTimeout(() => {
        console.log("changing avatar")
      }, 2000);
    } else {
      console.log("can't change avatar")
    }
  }

  return (
    <>
      <TextInput
        onChange={onChangeHandler}
        placeholder="avatarUrl"
        name="URL"
        classes="input-blue"
      />
      <Button clicked={changeAvatar} classes="form-btn btn-blueGradient btn-md">update</Button>
    </>
  );
};

export default ChangeAvatar;
