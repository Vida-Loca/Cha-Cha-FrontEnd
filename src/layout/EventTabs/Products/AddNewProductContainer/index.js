/* eslint-disable comma-dangle */
/* eslint-disable no-bitwise */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";
import checkValidation from "../../../../validation";
import Spinner from "../../../../components/Spinner";

import { productService } from "../../../../Authentication/service";

import { FormContext } from "../../../../context/FormContext";
import { UserContext } from "../../../../context/UserContext";

import validationRules from "./productValidationRules";


const AddNewProductContainer = ({ addProductToList, id, category }) => {
  const [form, setform] = useContext(FormContext);
  // eslint-disable-next-line comma-spacing
  const [loggedInUser,] = useContext(UserContext);
  const [sendingDataSpinner, setSendingDataSpinner] = useState(false);

  const [product, setProduct] = useState({
    name: {
      value: "", isValid: false, err: "", touched: false,
    },
    price: {
      value: "", isValid: false, err: "", touched: false,
    },
    quantity: {
      value: 1, isValid: true, err: "", touched: true,
    },
    productCategory: {
      value: "", isValid: false, err: "", touched: false,
    },
  });


  const onChangeHandler = (event) => {
    const validationResult = checkValidation(
      event.target.value,
      validationRules.find((x) => x.name === event.target.name).validation,
    );
    setProduct({
      ...product,
      [`${event.target.name}`]: {
        value: event.target.value,
        isValid: validationResult[0],
        err: validationResult[1],
        touched: true,
      },
    });
  };

  const submitProduct = () => {
    const chosenCategory = category || product.productCategory.value;
    if (product.name.isValid
      && product.price.isValid
      && product.quantity.isValid
      && (product.productCategory.isValid || !!category)) {
      setSendingDataSpinner(true);

      productService.addProduct(id,
        {
          name: product.name.value,
          price: product.price.value,
          quantity: product.quantity.value,
          productCategory: chosenCategory.toUpperCase(),
        })
        .then((res) => {
          setSendingDataSpinner(false);
          setform({ ...form, show: false });

          addProductToList({
            productCategory: chosenCategory.toUpperCase(),
            product: {
              id: res.id,
              name: res.name,
              price: res.price,
              quantity: res.quantity,
              user: {
                id: loggedInUser.user.id,
                username: loggedInUser.user.username,
                picUrl: loggedInUser.user.picUrl,
              },

            },
          });
        }).catch(() => {
          setSendingDataSpinner(false);
        });
    }
  };

  return (
    <>
      {validationRules.map((el) => (
        <TextInput
          key={el.name}
          onChange={onChangeHandler}
          placeholder={el.config.placeholder}
          type={el.config.type}
          name={el.name}
          value={!!category && el.config.disabled ? category : product[el.name].value}
          classes={product[el.name].touched ^ product[el.name].isValid ? "input-orange" : el.config.classes}
          error={product[el.name].err[0]}
          disabled={!!category && el.config.disabled}
        />
      ))}

      {sendingDataSpinner
        ? <Spinner classes="spinner-container-h-sm" size="spinner-sm" />
        : <Button clicked={submitProduct} classes="form-btn btn-blueGradient btn-md"> Add</Button>}
    </>
  );
};

AddNewProductContainer.defaultProps = {
  category: null,
};

AddNewProductContainer.propTypes = {
  category: PropTypes.string,
  addProductToList: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AddNewProductContainer;
