import React from "react";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";

const inviteUser = () => {
  return (
    <div>
      <TextInput placeholder="Username" name="username" />
      <Button classes="btn-blueGradient btn-md">send and invite</Button>
    </div>
  );
};

export default inviteUser;
