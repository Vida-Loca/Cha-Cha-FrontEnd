import React, { useState } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import Spinner from "../../../components/Spinner";

const ChangeAvatar = () => {
  const [sendingDataSpinner, setSendingDataSpinner] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState({ URL: "" });
  const onChangeHandler = event => {
    setAvatarUrl({
      ...avatarUrl,
      [`${event.target.name}`]: event.target.value
    });
  };

  const changeAvatar = () => {
    if (avatarUrl.URL.length > 5) {
      setSendingDataSpinner(true);
      setTimeout(() => {
        console.log("changing avatar")
        setSendingDataSpinner(false);
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
      {sendingDataSpinner
        ? <Spinner classes={"spinner-container-h-sm"} size={"spinner-sm"} />
        : <Button clicked={changeAvatar} classes="form-btn btn-blueGradient btn-md">update</Button>

      }
    </>
  );
};

export default ChangeAvatar;
