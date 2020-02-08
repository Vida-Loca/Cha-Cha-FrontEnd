import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { userService } from "../../../Authentication/service";
import { FormContext } from "../../../context/FormContext";
// import { newSupplyContainerForm } from "./FormsToBeRendered/FormsToBeRendered";

import "./Supply.scss";

import { Button } from "../../../components/Button/Index";
import { TextInput } from "../../../components/Inputs/Index";
import Form from "../../../components/Form/Form";
import SupplyCategory from "../../../components/SupplyCategory/SupplyCategory";
import Modal from "../../../components/Modal/Modal";

import products from "./Data/RealTempData";

const Supply = ({ id }) => {
  const [productsTemp, setProducts] = useState(products);

  const [supplyList2, setsupply2] = useState([]);

  // const [supplyList, setsupply] = useState({
  //   SupplyContainers
  // });

  const createSetOfCategories = array => {
    const newArray = [];

    const ListOfCategories = [];
    array.forEach(catgory => {
      ListOfCategories.push(catgory.productCategory.name);
    });

    const uniqCategory = [...new Set(ListOfCategories)];

    uniqCategory.forEach(cate => {
      const tempObject = { Category: cate, supplies: [] };

      for (let i = 0; i < array.length; i += 1) {
        let tempSupply = {};
        if (cate === array[i].productCategory.name) {
          array[i].userCards.forEach(user => {
            tempSupply = {
              id: user.eventUser.user.id,
              supply: array[i].name,
              userId: user.eventUser.user.id,
              user: user.eventUser.user.username,
              quantity: 2,
              price: array[i].price,
              picUrl: user.eventUser.user.picUrl
            };
          });
          tempObject.supplies.push(tempSupply);
        }
      }
      newArray.push(tempObject);
    });
    return newArray;
  };

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
    return () => {
      console.log("unmounted");
    };
  }, [productsTemp]);

  const [forms, setform] = useContext(FormContext);

  const [newEvent, setNewEvent] = useState({
    name: "",
    price: "",
    productCategory: ""
  });

  const openModalNewSupplyContainer = () => {
    setform({ show: true });
  };
  const onChangeHandler = event => {
    setNewEvent({ ...newEvent, [`${event.target.name}`]: event.target.value });
    console.log(newEvent);
  };

  const addNewProduct = event => {
    event.preventDefault();
    userService
      .addNewSuplyToEvent(id, newEvent)
      .then(body => {
        return body;
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const hideModal = () => {
    setform({ ...forms, show: false });
  };

  const newSupplyContainerForm = () => {
    return (
      <Form>
        <TextInput
          onChange={onChangeHandler}
          placeholder="Supply name"
          name="name"
        />
        <TextInput
          onChange={onChangeHandler}
          type="number"
          placeholder="Price"
          name="price"
        />
        <TextInput
          onChange={onChangeHandler}
          placeholder="Supply Container Name"
          name="productCategory"
        />
        <Button clicked={addNewProduct} classes="btn-blueGradient btn-md">
          apply
        </Button>
      </Form>
    );
  };

  return (
    <div className="SuplyBody">
      <Modal show={forms.show} modalClose={hideModal}>
        {newSupplyContainerForm()}
      </Modal>
      <div className="buttonContainer">
        <Button
          classes="btn-md btn-blueGradient"
          clicked={openModalNewSupplyContainer}
        >
          Add new supply +
        </Button>
      </div>

      {supplyList2.map(supCont => {
        return <SupplyCategory supCont={supCont} key={supCont.Category} />;
      })}
    </div>
  );
};

Supply.propTypes = {
  id: PropTypes.string.isRequired
};

export default Supply;
