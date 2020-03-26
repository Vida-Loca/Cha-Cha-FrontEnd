import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../../../components/Inputs";
import { Button } from "../../../../components/Button";
import checkValidation from "../../../../validation";
import Spinner from "../../../../components/Spinner";

import { productService } from "../../../../Authentication/service";

import { FormContext } from "../../../../context/FormContext";


const AddNewProductContainer = ({ testFunc, id, category }) => {

  const [form, setform] = useContext(FormContext);
  let [sendingDataSpinner, setSendingDataSpinner] = useState(false);

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

  };

  const submitProduct = () => {
    const chosenCategory = !!category ? category : product.productCategory.value;
    if (product.name.isValid && product.price.isValid && (product.productCategory.isValid || !!category)) {
      setSendingDataSpinner(true);

      productService.addProduct(id,
        {
          name: product.name.value,
          price: product.price.value,
          productCategory: chosenCategory
        })
        .then(res => {
          console.log(res);
          setSendingDataSpinner(false);
          setform({ ...form, show: false });
          testFunc({
            id: "tempid",
            supply: "dodany produkt",
            price: 222,
            userId: 1,
            user: "Test User",
            quantity: 1,
            picUrl: ""
          });

        }).catch(err => {
          console.log(err);
          setSendingDataSpinner(false);
        })


      // setTimeout(() => {
      //   console.log({
      //     name: product.name.value,
      //     price: product.price.value,
      //     productCategory: chosenCategory
      //   });
      //   setSendingDataSpinner(false);
      // }, 2000);


    } else {
      console.log("some fields are not valid");

    }
  }

  return (
    <>
      {formProducts.map(el => (
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
        ? <Spinner classes={"spinner-container-h-sm"} size={"spinner-sm"} />
        : <Button clicked={submitProduct} classes="form-btn btn-blueGradient btn-md"> Add</Button>
      }
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
