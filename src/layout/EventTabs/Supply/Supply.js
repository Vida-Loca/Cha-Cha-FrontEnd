import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import "./Supply.scss";

import { FormContext } from "../../../context/FormContext";
import { newSupplyContainerForm } from "./FormsToBeRendered/FormsToBeRendered";

import SupplyContainers from "./Data/TempData";

import Button from "../../../components/button/Button";
import SupplyCategory from "../../../components/SupplyCategory/SupplyCategory";

const Supply = () => {
  const setform = useContext(FormContext)[1];

  const [supplyList, setsupply] = useState({
    SupplyContainers
  });

  const openModalNewSupplyContainer = () => {
    setform({ show: true, renderForm: newSupplyContainerForm() });
  };

  return (
    <div className="SuplyBody">
      <div className="buttonContainer">
        <Button
          classes="btn-md btn-blueGradient"
          clicked={openModalNewSupplyContainer}
        >
          Create new supply container
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
