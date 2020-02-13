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
    console.log(avatarUrl);
  };
  return (
    <div>
      <TextInput
        onChange={onChangeHandler}
        placeholder="avatarUrl"
        name="URL"
        classes="input-blue"
      />
      <Button classes="btn-blueGradient btn-md">update</Button>
    </div>
  );
};

export default ChangeAvatar;
