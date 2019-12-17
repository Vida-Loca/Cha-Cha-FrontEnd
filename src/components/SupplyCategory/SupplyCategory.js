import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import "./SupplyCategory.scss";

import Button from "../button/Button";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import SupplyUserTile from "../SupplyUserTile/SupplyUserTile";
import ThreeDots from "../ThreeDots/ThreeDots";

import {
  editSupplyForm,
  addSupplyForm
} from "./FormsToBeRendered/FormsToBeRendered";
import { FormContext } from "../../context/FormContext";

const SupplyCategory = ({ openModal, supCont }) => {
  const [supplyContainer, setsupplyContainer] = useState(supCont);

  const setform = useContext(FormContext)[1];

  const openModalEditSupply = userId => {
    setform({ renderForm: editSupplyForm() });
    console.log(userId);
    openModal();
  };

  const openModalAddSupply = () => {
    setform({ renderForm: addSupplyForm() });
    openModal();
  };

  const showMoreHandler = () => {
    supplyContainer.showMore = !supplyContainer.showMore;
    setsupplyContainer({ ...supplyContainer });
  };

  return (
    <div
      className={
        supplyContainer.showMore
          ? "CategoryContainer"
          : "CategoryContainer hide"
      }
    >
      <div className="SupplyHeader">
        <p className="CategoryLabel">{supplyContainer.Category}</p>
        <ShowMoreButton
          showState={supplyContainer.showMore}
          clicked={() => showMoreHandler()}
        />

        <div className="PriceAndAdd">
          <p className="PriceLabel">
            {Object.keys(supplyContainer.supplies).reduce((previous, index) => {
              return previous + supplyContainer.supplies[index].price;
            }, 0)}
            <span> zl</span>
          </p>
          <Button
            clicked={openModalAddSupply}
            classes="btn-sm btn-orangeGradient"
          >
            <i className="fas fa-plus-circle" />
          </Button>
        </div>
        <ThreeDots />
      </div>

      <div className="SupplyBody">
        {supplyContainer.supplies.map((sup, indexing) => {
          return (
            <SupplyUserTile
              user={sup.user}
              supply={sup.supply}
              price={sup.price}
              key={sup.user + indexing}
              openModal={openModalEditSupply}
            />
          );
        })}
      </div>
    </div>
  );
};

SupplyCategory.propTypes = {
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func,
  supCont: Object.isRequired
};

export default SupplyCategory;
