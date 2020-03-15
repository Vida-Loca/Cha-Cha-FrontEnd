import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// import { userService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";

import "./Supply.scss";
import createSetOfCategories from "./helper";

import { Button } from "../../../components/Button";
import ProductCategory from "../../../components/ProductCategory";
import PaginatedContainer from "../../../components/PaginatedContainer";
import AddNewProductContainer from "./AddNewProductContainer";

import { eventProducts } from "../../../mockData";

const Supply = ({ id }) => {
  const [productList, setProduct] = useState([]);


  useEffect(() => {
    setTimeout(() => {
      setProduct(createSetOfCategories(eventProducts));

    }, 1000);

    return () => { };
  }, []);

  const [forms, setform] = useContext(FormContext);

  const addNewProductModal = () => {
    setform({ ...forms, renderForm: <AddNewProductContainer />, show: true });
  };


  return (
    <div className="SuplyBody">
      <div className="buttonContainer">
        <Button classes="btn-md btn-blueGradient" clicked={addNewProductModal}>
          Add new supply +
        </Button>
      </div>
      <PaginatedContainer
        title="Product list"
        items={productList}
        perPage={5}
        render={({ items }) => items.map(supCont => <ProductCategory supCont={supCont} key={supCont.Category} />)}
      />
    </div>
  );
};

Supply.propTypes = {
  id: PropTypes.string.isRequired
};

export default Supply;
