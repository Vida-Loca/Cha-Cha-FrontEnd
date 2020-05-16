import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import createSetOfCategories from "./helper";

import { productService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";

import { Button } from "../../../components/Button";

import ProductCategory from "../../../components/ProductCategory";
import PaginatedContainer from "../../../components/PaginatedContainer";

import MyProducts from "../../../components/MyProducts";

import AddNewProductContainer from "./AddNewProductContainer";
import Overview from "./Overview";

// import { eventProducts } from "../../../mockData";
import Spinner from "../../../components/Spinner";

import "./Products.scss";

const Products = ({ eventId, isEventAdmin, currency }) => {
  const [productList, setProduct] = useState({ products: [], spinner: true });
  const [loggedInUserProducts, setLoggedInUserProducts] = useState({ products: [], spinner: true });
  const [forms, setform] = useContext(FormContext);
  const [totalSum, setTotalSum] = useState(0);


  useEffect(() => {
    let __isMounted = true;

    productService.getTotalEventAmount(eventId)
    .then(res =>{
      setTotalSum(res);
    })
    productService.getProductsFromEvent(eventId)
      .then(res => {
        if (__isMounted) {
          setProduct({ products: createSetOfCategories(res), spinner: false });
        }
      }, _err => {
        if (__isMounted) {
          setProduct({ products: [], spinner: false });
        }
      })

    productService.getProductsOfCurrentUser(eventId)
    .then(res =>{
      const newMyProductList = res.map(el =>({...el, productCategory: el.productCategory.name}));

      setLoggedInUserProducts({ products: newMyProductList, spinner: false });
      
    }, _err =>{
      setLoggedInUserProducts({ products: [], spinner: false })
    })


    return () => {
      __isMounted = false;
    };
  }, [eventId]);





  const addProduct = (addedProduct) => {
    let tempProductsList = productList.products;
    
    // check if given category exists
    let foundIndex = tempProductsList.findIndex(catList => catList.productCategory === addedProduct.productCategory);
    if (foundIndex < 0) {
      let tempProductCat = { productCategory: addedProduct.productCategory, products: [addedProduct.product] }
      tempProductsList.push(tempProductCat);
      setProduct({ ...productList, products: tempProductsList });
    }
    else {
      let foundIndexOfProduct = tempProductsList[foundIndex].products.findIndex( prod => prod.id === addedProduct.product.id);
      if(foundIndexOfProduct > -1){
        tempProductsList[foundIndex].products[foundIndexOfProduct].quantity = addedProduct.product.quantity;
      } else{
        tempProductsList[foundIndex].products.push(addedProduct.product);
      }
     
      setProduct({ ...productList, products: tempProductsList });
    }

  }

  const addNewProductModal = () => {
    setform({ ...forms, renderForm: <AddNewProductContainer addProductToList={addProduct} id={eventId} />, show: true });
  };

  const overviewOpenModal = () => {
    setform({ ...forms, renderForm: <Overview eventProducts={productList.products} eventId={eventId} currency={currency} />, show: true });
  };


  return (
    <div className="product-container">
      <div className="button-container-add-new">
        <Button classes="btn-md btn-blueGradient" clicked={addNewProductModal}>
          Add new supply +
        </Button>
      </div>
      <div className="button-container">
        <p className="full-price-label">
          <span className="label">Total:</span>
          <span className="price">{totalSum}<span className="currency"> {currency}</span></span>
        </p>
        <Button classes="btn-md btn-orangeGradient" clicked={overviewOpenModal}>
        <i className="fas fa-chart-bar" /> expenses
        </Button>
      </div>

      <div className="my-products">
        <h2 style={{textAlign: "center"}}>My products</h2>
        {
          loggedInUserProducts.spinner
          ? <Spinner />
          : <MyProducts 
              currency={currency}
              isEventAdmin={isEventAdmin} 
              eventId={eventId} 
              supCont={loggedInUserProducts.products} 
              key="myProducts" 
           />
        }
        

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
              key={supCont.productCategory} 
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
