import React from "react";
import Form from "../../../../components/Form/Form";
import TextInput from "../../../../components/Inputs/TextInput/TextInput";
import Button from "../../../../components/button/Button";

const inviteUser = () => {
  return (
    <Form>
      <TextInput placeholder="Username" name="username" />
      <Button classes="btn-blueGradient btn-md">send and invite</Button>
    </Form>
  );
};

export default inviteUser;
