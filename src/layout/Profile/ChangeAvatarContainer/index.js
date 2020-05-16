import React, { useState, useContext } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import { profileService } from "../../../Authentication/service";

import { FormContext } from "../../../context/FormContext";
import { FlashMessageContext } from "../../../context/FlashMessageContext";

const ChangeAvatar = ({ changeAvatarState }) => {
  const [sendingDataSpinner, setSendingDataSpinner] = useState(false);

  const [, setChangedForm] = useContext(FormContext);
  const [, setFlashMessage] = useContext(FlashMessageContext);

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
      profileService.changeAvatar(avatarUrl.URL)
        .then(_ => {
          setSendingDataSpinner(false)
          changeAvatarState(avatarUrl.URL);
          setChangedForm({ renderForm: "", show: false });
        }, _ => {
          setSendingDataSpinner(false)
        });

    } else {
      setFlashMessage({
        message: "there ha sbeen a problem with updating your profile picture",
        show: true,
        messageState: "error"
      });
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
