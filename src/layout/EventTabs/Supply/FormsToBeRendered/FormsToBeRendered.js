import React from "react";
import { TextInput } from "../../../../components/Inputs/Index";
import Form from "../../../../components/Form/Form";
import { Button } from "../../../../components/Button/Index";

export const newSupplyContainerForm = () => {
  return (
    <Form>
      <TextInput
        onChange={onChangeHandler}
        placeholder="Supply name"
        name="name"
      />
      <TextInput
        onChange={onChangeHandler}
        type="number"
        placeholder="Price"
        name="price"
      />
      <TextInput
        onChange={onChangeHandler}
        placeholder="Supply Container Name"
        name="productCategory"
      />
      <Button classes="btn-blueGradient btn-md">apply</Button>
    </Form>
  );
};

export const editSupplyForm = ({ onChangeHandler }) => {
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
