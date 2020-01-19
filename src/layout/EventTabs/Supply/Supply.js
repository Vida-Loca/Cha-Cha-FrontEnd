import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import "./Supply.scss";

import { FormContext } from "../../../context/FormContext";
// import { newSupplyContainerForm } from "./FormsToBeRendered/FormsToBeRendered";

import SupplyContainers from "./Data/TempData";

import Button from "../../../components/button/Button";
import TextInput from "../../../components/Inputs/TextInput/TextInput";
import Form from "../../../components/Form/Form";

import SupplyCategory from "../../../components/SupplyCategory/SupplyCategory";
import Modal from "../../../components/Modal/Modal";

const Supply = () => {
  const [forms, setform] = useContext(FormContext);

  const [supplyList, setsupply] = useState({
    SupplyContainers
  });

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
        <Button classes="btn-blueGradient btn-md">apply</Button>
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

      {supplyList.SupplyContainers.map(supCont => {
        return (
          <SupplyCategory
            supCont={supCont}
            key={supCont.Category.slice().replace(" ", "")}
          />
        );
      })}
    </div>
  );
};

Supply.propTypes = {
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func
};

export default Supply;
