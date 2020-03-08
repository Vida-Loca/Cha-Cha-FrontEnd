import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";
import checkValidation from "../../../../validation";
import { FormContext } from "../../../../context/FormContext";

const AddNewProductContainer = ({ category }) => {
  const [forms, setForms] = useContext(FormContext);

  const [product, setProduct] = useState({
    name: { value: "", isValid: false, err: "", touched: false },
    price: { value: "", isValid: false, err: "", touched: false },
    productCategory: { value: "", isValid: false, err: "", touched: false }
  });

  const formProducts = useState([
    {
      name: "name",
      config: {
        type: "text",
        placeholder: "name",
        classes: "input-blue"
      },
      validation: {
        required: true,
        string: true
      }
    },
    {
      name: "price",
      config: {
        type: "number",
        placeholder: "price",
        classes: "input-blue"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    },
    {
      name: "productCategory",
      config: {
        type: "text",
        placeholder: "product category",
        classes: "input-blue",
        disabled: true
      },
      validation: {
        required: true
      }
    }
  ])[0];

  const onChangeHandler = event => {
    const validationResult = checkValidation(
      event.target.value,
      formProducts.find(x => x.name === event.target.name).validation
    );
    setProduct({
      ...product,
      [`${event.target.name}`]: {
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1],
        touched: true
      }
    });
    console.log(product[event.target.name].err);
  };

  const sendData = () => {
    let isFormValid = true;
    for (let key in product) {
      isFormValid = product[key].isValid && isFormValid;
    }
    if (isFormValid) {
      console.log("---- sending: ...");
    } else {
      setForms({
        ...forms
      });
    }
  };
  return (
    <>
      {formProducts.map(el => (
        <TextInput
          key={el.name}
          onChange={onChangeHandler}
          placeholder={el.config.placeholder}
          type={el.config.type}
          name={el.name}
          value={
            !!category && el.config.disabled ? category : product[el.name].value
          }
          classes={
            product[el.name].touched ^ product[el.name].isValid
              ? "input-orange"
              : el.config.classes
          }
          error={product[el.name].err[0]}
          disabled={!!category && el.config.disabled}
        />
      ))}
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
