import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";

const AddNewProductContainer = ({ category }) => {
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

  const sendData = () => {
    console.log("---- sending: ...");
    console.log(category ? { ...product, productCategory: category } : product);
  };
  return (
    <>
      <TextInput
        onChange={onChangeHandler}
        placeholder="Supply name"
        name="name"
        value={product.name}
        classes="input-blue"
      />
      <TextInput
        onChange={onChangeHandler}
        type="number"
        placeholder="Price"
        name="price"
        value={product.price}
        classes="input-blue"
      />
      <TextInput
        onChange={onChangeHandler}
        placeholder="Supply Container Name"
        name="productCategory"
        value={category || product.productCategory}
        disabled={category !== null}
        classes="input-blue"
      />

      <Button clicked={sendData} classes="form-btn btn-blueGradient btn-md">
        Add
      </Button>
    </>
  );
};

AddNewProductContainer.defaultProps = {
  category: null
};

AddNewProductContainer.propTypes = {
  category: PropTypes.string
};

export default AddNewProductContainer;
