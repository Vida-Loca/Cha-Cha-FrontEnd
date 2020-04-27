import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import "./ProductCategory.scss";

import { ShowMore, Button } from "../Button";
import ProductCard from "./ProductCard";
import AddNewProductContainer from "../../layout/EventTabs/Products/AddNewProductContainer";

import { FormContext } from "../../context/FormContext";
import { productService } from "../../Authentication/service";

const ProductCategory = ({ isEventAdmin, eventId, supCont, currency }) => {
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

  const removeProductFromCategory = (eventId, productId) => {
    productService.removeProduct(eventId, productId)
      .then(res => {
        setsupplyContainer({ ...supplyContainer, supplies: supplyContainer.supplies.filter(prod => prod.id !== productId), show: true })
      }, err => {
        console.log(err);
      })
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
            <span> {currency}</span>
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
              currency={currency}
              removeProduct={() => removeProductFromCategory(eventId, sup.id)}
              eventId={eventId}
              product={{
                id: sup.id,
                name: sup.supply,
                price: sup.price
              }}
              user={{
                id: sup.userId,
                picUrl: sup.picUrl,
                username:sup.user,
                isEventAdmin: isEventAdmin
              }}
              key={`${sup.id}-${sup.userId}`}
              category={supCont.Category}
            />
          );
        })}
      </div>
    </div>
  );
};

ProductCategory.propTypes = {
  eventId: PropTypes.string.isRequired,
  isEventAdmin: PropTypes.bool.isRequired,
  supCont: PropTypes.shape({
    Category: PropTypes.string.isRequired,
    supplies: PropTypes.array.isRequired
  })
};

export default ProductCategory;
