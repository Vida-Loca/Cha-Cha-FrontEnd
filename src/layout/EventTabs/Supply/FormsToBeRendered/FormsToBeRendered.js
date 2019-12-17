import React from "react";
import TextInput from "../../../../components/Inputs/TextInput/TextInput";
import Form from "../../../../components/Form/Form";
import Button from "../../../../components/button/Button";

export const newSupplyContainerForm = () => {
  return (
    <Form>
      <TextInput
        placeholder="Supply Container Name"
        name="supplyContainerName"
      />
      <Button to="/home" classes="btn-blueGradient btn-md">
        apply
      </Button>
    </Form>
  );
};

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
