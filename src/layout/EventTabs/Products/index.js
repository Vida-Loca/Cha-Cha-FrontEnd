import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// import { userService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";

import createSetOfCategories from "./helper";

import { Button } from "../../../components/Button";
import ProductCategory from "../../../components/ProductCategory";
import PaginatedContainer from "../../../components/PaginatedContainer";
import AddNewProductContainer from "./AddNewProductContainer";

import { eventProducts } from "../../../mockData";
import Spinner from "../../../components/Spinner";

import "./Products.scss";

const Products = ({ id }) => {

  let __isMounted = false

  const [productList, setProduct] = useState({ products: [], spinner: true });


  useEffect(() => {
    __isMounted = true;
    setTimeout(() => {
      if (__isMounted) {
        setProduct({ products: createSetOfCategories(eventProducts), spinner: false });
      }

    }, 1000);

    return () => {
      __isMounted = false;
    };
  }, []);

  const [forms, setform] = useContext(FormContext);

  const addNewProductModal = () => {
    setform({ ...forms, renderForm: <AddNewProductContainer />, show: true });
  };


  return (
    <div className="product-container">
      <div className="button-container">
        <Button classes="btn-md btn-blueGradient" clicked={addNewProductModal}>
          Add new supply +
        </Button>
      </div>

      <PaginatedContainer
        title="Product list"
        items={productList.products}
        perPage={5}
        render={
          productList.spinner
            ? (() => <Spinner />)
            : (({ items }) => items.map(supCont => <ProductCategory supCont={supCont} key={supCont.Category} />))
        }
      />

    </div>
  );
};

Products.propTypes = {
  id: PropTypes.string.isRequired
};

export default Products;
