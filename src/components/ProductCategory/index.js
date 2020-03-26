import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import "./ProductCategory.scss";

import { ShowMore, Button } from "../Button";
import ProductCard from "./ProductCard";
import AddNewProductContainer from "../../layout/EventTabs/Products/AddNewProductContainer";

import { FormContext } from "../../context/FormContext";


const ProductCategory = ({ eventId, supCont }) => {
  const [supplyContainer, setsupplyContainer] = useState({
    ...supCont,
    showMore: false
  });
  const [, setform] = useContext(FormContext);

  const addProduct = (addedProduct) => {
    let tempSup = supplyContainer.supplies;
    tempSup.push(addedProduct.product);
    setsupplyContainer({ ...supplyContainer, supplies: tempSup });
  }

  const openModalAddSupply = () => {
    setform({
      show: true,
      renderForm: <AddNewProductContainer addProduct={addProduct} id={eventId} category={supplyContainer.Category} />
    });
  };

  const showMoreHandler = () => {
    supplyContainer.showMore = !supplyContainer.showMore;
    setsupplyContainer({ ...supplyContainer });
  };

  const removeProductFromCategory = (id) => {
    setsupplyContainer({ ...supplyContainer, supplies: supplyContainer.supplies.filter(prod => prod.id !== id), show: true })
  }



  return (
    <div className={supplyContainer.showMore ? "category-container" : "category-container hide"}>
      <div className="product-header">
        <div className="label-button">
          <p className="category-label">{supplyContainer.Category}</p>
          <ShowMore showState={supplyContainer.showMore} clicked={() => showMoreHandler()} />
        </div>
        <div className="price-and-add">
          <p className="price-label">
            {Number(
              Object.keys(supplyContainer.supplies).reduce((previous, index) => {
                return previous + supplyContainer.supplies[index].price;
              }, 0)
            ).toFixed(2)}
            <span> zl</span>
          </p>
          <Button clicked={openModalAddSupply} classes="btn-sm btn-orangeGradient">
            <i className="fas fa-plus-circle" />
          </Button>
        </div>
      </div>

      <div className="product-collection">
        {supplyContainer.supplies.map(sup => {
          return (
            <ProductCard
              removeProduct={() => removeProductFromCategory(sup.id)}
              eventId={eventId}
              id={sup.id}
              user={sup.user}
              supply={sup.supply}
              price={sup.price}
              key={sup.id}
              picUrl={sup.picUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

ProductCategory.propTypes = {
  eventId: PropTypes.string.isRequired,
  supCont: PropTypes.shape({
    Category: PropTypes.string.isRequired,
    supplies: PropTypes.array.isRequired
  })
};

export default ProductCategory;
