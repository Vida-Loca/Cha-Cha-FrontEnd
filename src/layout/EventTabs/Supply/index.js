import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// import { userService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";

import "./Supply.scss";
import createSetOfCategories from "./helper";

import { Button } from "../../../components/Button";
import SupplyCategory from "../../../components/ProductCategory";
import Modal from "../../../components/Modal";
import PaginatedContainer from "../../../components/PaginatedContainer";
import AddNewProductContainer from "./AddNewProductContainer";

import products from "./Data/RealTempData";

const Supply = ({ id }) => {
  const productsTemp = useState(products)[0];

  const [supplyList2, setsupply2] = useState([]);

  // const [supplyList, setsupply] = useState({
  //   SupplyContainers
  // });

  useEffect(() => {
    // console.log("mounted");
    // console.log(productsTemp);
    setsupply2(createSetOfCategories(productsTemp));
    // console.log(supplyList2);

    // userService
    //   .getAllProductsFromGivenEvent(id)
    //   .then(body => {
    //     return body;
    //   })
    //   .then(res => {
    //     console.log(res);
    //     // setform({ ...forms, show: false });
    //     setsupply2(createSetOfCategories(res));
    //     console.log(supplyList2);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    return () => {};
  }, [productsTemp]);

  const [forms, setform] = useContext(FormContext);

  const addNewProductModal = () => {
    setform({ renderForm: <AddNewProductContainer />, show: true });
  };

  // const addNewProduct = event => {
  //   event.preventDefault();
  //   userService
  //     .addNewSuplyToEvent(id, newEvent)
  //     .then(body => {
  //       return body;
  //     })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const hideModal = () => {
    setform({ ...forms, show: false });
  };

  return (
    <div className="SuplyBody">
      <Modal show={forms.show} modalClose={hideModal}>
        {forms.renderForm}
      </Modal>
      <div className="buttonContainer">
        <Button classes="btn-md btn-blueGradient" clicked={addNewProductModal}>
          Add new supply +
        </Button>
      </div>
      <PaginatedContainer
        title="Product list"
        items={supplyList2}
        perPage={5}
        render={({ items }) =>
          items.map(supCont => (
            <SupplyCategory supCont={supCont} key={supCont.Category} />
          ))
        }
      />
    </div>
  );
};

Supply.propTypes = {
  id: PropTypes.string.isRequired
};

export default Supply;
