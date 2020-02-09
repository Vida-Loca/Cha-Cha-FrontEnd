import React from "react";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";

export const newSupplyContainerForm = () => {
  return (
    <div>
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
    </div>
  );
};

export const editSupplyForm = ({ onChangeHandler }) => {
  const data = [
    { name: "username", placeholder: "Username" },
    { name: "supplyContainerName", placeholder: "Supply Container Name" },
    { name: "price", placeholder: "Price" }
  ];
  return (
    <div>
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
    </div>
  );
};
export const addSupplyForm = () => {
  const data = [
    { name: "username", placeholder: "Username" },
    { name: "supplyContainerName", placeholder: "Supply Container Name" },
    { name: "price", placeholder: "Price" }
  ];
  return (
    <div>
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
    </div>
  );
};
