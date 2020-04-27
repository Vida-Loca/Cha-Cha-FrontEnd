import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import createSetOfCategories from "./helper";

import { productService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";

import { Button } from "../../../components/Button";
import ProductCategory from "../../../components/ProductCategory";
import PaginatedContainer from "../../../components/PaginatedContainer";
import AddNewProductContainer from "./AddNewProductContainer";

// import { eventProducts } from "../../../mockData";
import Spinner from "../../../components/Spinner";

import "./Products.scss";

const Products = ({ eventId, isEventAdmin, currency }) => {
  const [productList, setProduct] = useState({ products: [], spinner: true });
  const [forms, setform] = useContext(FormContext);



  useEffect(() => {
    let __isMounted = true;

    productService.getProductsFromEvent(eventId)
      .then(res => {
        if (__isMounted) {
          setProduct({ products: createSetOfCategories(res), spinner: false });
        }
      }, _ => {
        if (__isMounted) {
          setProduct({ products: [], spinner: false });
        }
      })


    return () => {
      __isMounted = false;
    };
  }, [eventId]);


  const addProduct = (addedProduct) => {
    let tempProductsList = productList.products;
    let foundIndex = tempProductsList.findIndex(catList => catList.Category === addedProduct.category);

    if (foundIndex < 0) {
      let tempProductCat = { Category: addedProduct.category, supplies: [addedProduct.product] }
      tempProductsList.push(tempProductCat);
      setProduct({ ...productList, products: tempProductsList });
    }
    else {
      tempProductsList[foundIndex].supplies.push(addedProduct.product);
      setProduct({ ...productList, products: tempProductsList });
    }

  }

  const addNewProductModal = () => {
    setform({ ...forms, renderForm: <AddNewProductContainer addProduct={addProduct} id={eventId} />, show: true });
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
            : (({ items }) => items.map(supCont => 
            <ProductCategory 
              currency={currency}
              isEventAdmin={isEventAdmin} 
              eventId={eventId} 
              supCont={supCont} 
              key={supCont.Category} 
            />))
        }
      />

    </div>
  );
};

Products.propTypes = {
  eventId: PropTypes.string.isRequired,
  isEventAdmin: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired
};

export default Products;
