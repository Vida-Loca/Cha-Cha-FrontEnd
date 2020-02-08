import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import "./SupplyCategory.scss";

import { Button, IconButton } from "../Button/Index";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import SupplyUserTile from "../SupplyUserTile/SupplyUserTile";

import {
  editSupplyForm,
  addSupplyForm
} from "./FormsToBeRendered/FormsToBeRendered";
import { FormContext } from "../../context/FormContext";

const SupplyCategory = ({ supCont }) => {
  const [supplyContainer, setsupplyContainer] = useState({
    ...supCont,
    showMore: false
  });
  const setform = useContext(FormContext)[1];

  const openModalEditSupply = userId => {
    setform({ show: true, renderForm: editSupplyForm() });
    console.log(userId);
  };

  const openModalAddSupply = () => {
    setform({ show: true, renderForm: addSupplyForm() });
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
            {Number(
              Object.keys(supplyContainer.supplies).reduce(
                (previous, index) => {
                  return previous + supplyContainer.supplies[index].price;
                },
                0
              )
            ).toFixed(2)}
            <span> zl</span>
          </p>
          {/* <Button
            clicked={openModalAddSupply}
            classes="btn-sm btn-orangeGradient"
          >
            <i className="fas fa-plus-circle" />
          </Button> */}
        </div>
        <IconButton iconClass="fas fa-ellipsis-v" />
      </div>

      <div className="SupplyBody">
        {supplyContainer.supplies.map(sup => {
          return (
            <SupplyUserTile
              user={sup.user}
              supply={sup.supply}
              price={sup.price}
              key={`${sup.id}-${sup.supply}`}
              picUrl={sup.picUrl}
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
  supCont: PropTypes.shape({
    Category: PropTypes.string.isRequired,
    supplies: PropTypes.array.isRequired
  })
};

export default SupplyCategory;
