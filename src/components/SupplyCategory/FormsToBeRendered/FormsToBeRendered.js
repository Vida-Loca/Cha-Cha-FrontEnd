import React from "react";
import { Button } from "../../Button/Index";
import { TextInput } from "../../Inputs/Index";
import Form from "../../Form/Form";

export const editSupplyForm = () => {
  const data = [
    { name: "username", placeholder: "Username" },
    { name: "supplyContainerName", placeholder: "Supply Container Name" },
    { name: "price", placeholder: "Price" }
  ];
  return (
    <Form>
      {data.map(TxtInput => {
        return (
          <TextInput
            placeholder={TxtInput.placeholder}
            name={TxtInput.name}
            key={TxtInput.name}
          />
        );
      })}
      <Button classes="btn-blueGradient btn-md">apply</Button>
    </Form>
  );
};
export const addSupplyForm = () => {
  const data = [
    { name: "username", placeholder: "Username" },
    { name: "supplyContainerName", placeholder: "Supply Container Name" },
    { name: "price", placeholder: "Price" }
  ];
  return (
    <Form>
      {data.map(TxtInput => {
        return (
          <TextInput
            placeholder={TxtInput.placeholder}
            name={TxtInput.name}
            key={TxtInput.name}
          />
        );
      })}
      <Button classes="btn-blueGradient btn-md">apply</Button>
    </Form>
  );
};
