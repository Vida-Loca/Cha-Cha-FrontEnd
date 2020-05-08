import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";
import checkValidation from "../../../../validation";
import Spinner from "../../../../components/Spinner";

import { productService } from "../../../../Authentication/service";

import { FormContext } from "../../../../context/FormContext";
import { UserContext } from "../../../../context/UserContext";
import {validationRules} from "../AddNewProductContainer/productValidationRules";

const EditProductContainer = ({ updateProductInList, eventId, prodId, category, name, quantity, price }) => {

  const [form, setform] = useContext(FormContext);
  const [loggedInUser,] = useContext(UserContext);
  let [sendingDataSpinner, setSendingDataSpinner] = useState(false);

  const [product, setProduct] = useState({
    name: { value: name, isValid: true, err: "", touched: true },
    price: { value: price, isValid: true, err: "", touched: true },
    quantity: { value: quantity, isValid: true, err: "", touched: true },
    productCategory: { value: category, isValid: true, err: "", touched: true }
  });



  const onChangeHandler = event => {
    const validationResult = checkValidation(
      event.target.value,
      validationRules.find(x => x.name === event.target.name).validation
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

  };

  const submitProduct = () => {
    if (product.name.isValid && product.price.isValid && (product.productCategory.isValid || !!category)) {
      setSendingDataSpinner(true);
      const newProduct = {
        name: product.name.value,
        price: parseFloat(product.price.value),
        quantity: parseFloat(product.quantity.value),
        productCategory: product.productCategory.value.toUpperCase()
      };

      

      productService.updateProduct(eventId,prodId,newProduct)
        .then(res => {
          updateProductInList(prodId,newProduct);
          console.log(res);
          setSendingDataSpinner(false);
          setform({ ...form, show: false });
          
        }).catch(err => {
          console.log(err);
          setSendingDataSpinner(false);
        })

    } else {
      console.log("some fields are not valid");

    }
  }

  return (
    <>
      {validationRules.map(el => (
        <TextInput
          key={el.name}
          onChange={onChangeHandler}
          placeholder={el.config.placeholder}
          type={el.config.type}
          name={el.name}
          value={product[el.name].value}
          classes={product[el.name].touched ^ product[el.name].isValid ? "input-orange" : el.config.classes}
          error={product[el.name].err[0]}
        />
      ))}

      {sendingDataSpinner
        ? <Spinner classes={"spinner-container-h-sm"} size={"spinner-sm"} />
        : <Button clicked={submitProduct} classes="form-btn btn-blueGradient btn-md">Update</Button>
      }
    </>
  );
};

EditProductContainer.defaultProps = {
  category: null
};

EditProductContainer.propTypes = {
  category: PropTypes.string,
  addProductToList: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default EditProductContainer;
