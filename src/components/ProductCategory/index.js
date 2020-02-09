import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import "./ProductCategory.scss";

import { ShowMore, Button } from "../Button";
import ProductCard from "./ProductCard";

import { FormContext } from "../../context/FormContext";

const ProductCategory = ({ supCont }) => {
  const [supplyContainer, setsupplyContainer] = useState({
    ...supCont,
    showMore: false
  });
  const setform = useContext(FormContext)[1];

  const openModalAddSupply = () => {
    setform({ show: true, renderForm: "" });
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
        <ShowMore
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
          <Button
            clicked={openModalAddSupply}
            classes="btn-sm btn-orangeGradient"
          >
            <i className="fas fa-plus-circle" />
          </Button>
        </div>
      </div>

      <div className="SupplyBody">
        {supplyContainer.supplies.map(sup => {
          return (
            <ProductCard
              user={sup.user}
              supply={sup.supply}
              price={sup.price}
              key={`${sup.id}-${sup.supply}`}
              picUrl={sup.picUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

ProductCategory.propTypes = {
  // eslint-disable-next-line react/require-default-props
  supCont: PropTypes.shape({
    Category: PropTypes.string.isRequired,
    supplies: PropTypes.array.isRequired
  })
};

export default ProductCategory;
