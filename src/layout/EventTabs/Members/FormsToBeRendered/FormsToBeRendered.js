import React from "react";
import Form from "../../../../components/Form/Form";
import { TextInput } from "../../../../components/Inputs/Index";
import { Button } from "../../../../components/Button/Index";

const inviteUser = () => {
  return (
    <Form>
      <TextInput placeholder="Username" name="username" />
      <Button classes="btn-blueGradient btn-md">send and invite</Button>
    </Form>
  );
};

export default inviteUser;
