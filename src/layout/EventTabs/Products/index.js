import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { productService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";

import createSetOfCategories from "./helper";

import { Button } from "../../../components/Button";
import ProductCategory from "../../../components/ProductCategory";
import PaginatedContainer from "../../../components/PaginatedContainer";
import AddNewProductContainer from "./AddNewProductContainer";

// import { eventProducts } from "../../../mockData";
import Spinner from "../../../components/Spinner";

import "./Products.scss";

const Products = ({ id }) => {
  const [productList, setProduct] = useState({ products: [], spinner: true });


  useEffect(() => {
    let __isMounted = true;

    productService.getProductsFromEvent(id)
      .then(res => {
        console.log(res);
        setProduct({ products: createSetOfCategories(res), spinner: false });
      }).catch(err => {
        console.log(err);
        setProduct({ products: [], spinner: false });
      })

    return () => {
      __isMounted = false;
    };
  }, []);

  const [forms, setform] = useContext(FormContext);

  const addNewProductModal = () => {
    setform({ ...forms, renderForm: <AddNewProductContainer id={id} />, show: true });
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
            : (({ items }) => items.map(supCont => <ProductCategory eventId={id} supCont={supCont} key={supCont.Category} />))
        }
      />

    </div>
  );
};

Products.propTypes = {
  id: PropTypes.string.isRequired
};

export default Products;
