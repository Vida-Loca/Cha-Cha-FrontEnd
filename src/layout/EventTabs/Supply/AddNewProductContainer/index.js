import React, { useState } from "react";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";

const AddNewProductContainer = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    productCategory: ""
  });
  const onChangeHandler = event => {
    setProduct({
      ...product,
      [`${event.target.name}`]: event.target.value
    });
    console.log(product);
  };
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

export default AddNewProductContainer;
