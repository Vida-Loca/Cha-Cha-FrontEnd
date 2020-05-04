import React, { useState } from "react";
import PropTypes from "prop-types";

import "./MyProducts.scss";

import { ShowMore, Button } from "../Button";
import MyProductCard from "./MyProductCard";
import { OptionsInput } from "../Inputs";

import { productService } from "../../Authentication/service";

const MyProducts = ({ isEventAdmin, eventId, supCont, currency }) => {
  const [productContainer, setProductContainer] = useState({
    products: [...supCont],
    showMore: false
  });

  const getASetOfCategires = () =>{
    let categorySet = new Set(supCont.map(cat => cat.productCategory));
    categorySet.add("ALL");
    return Array.from(categorySet);
  }

  const [selectedCategories, setSelectedCategoreies] = useState({categories: getASetOfCategires(), selected: "ALL"})


  const onChangeHandlerCategories = event => {
    setSelectedCategoreies({
        ...selectedCategories, selected: event.target.value
    })
}

  const showMoreHandler = () => {
    productContainer.showMore = !productContainer.showMore;
    setProductContainer({ ...productContainer });
  };

  const removeProductFromCategory = (eventId, productId) => {
    productService.removeProduct(eventId, productId)
      .then(_res => {
        setProductContainer({ ...productContainer, products: productContainer.products.filter(prod => prod.id !== productId), show: true })
      }, err => {
        console.log(err);
      })
  }

  const calculateTotalPrice = () =>{
    const totalPrice = productContainer.products.reduce((acc, val) =>{
      return acc += val.price;
    }, 0);
    return Number(totalPrice).toFixed(2);
  }


  return (
    <div className={productContainer.showMore ? "category-container" : "category-container hide"}>
      <div className="product-header">
        <div className="label-button">
          <div className="category-label"><OptionsInput onChange={onChangeHandlerCategories} value={selectedCategories.selected} name="filterByCategory" options={selectedCategories.categories} /></div>
          <ShowMore showState={productContainer.showMore} clicked={() => showMoreHandler()} />
        </div>
        <div className="price-and-add">
          <p className="price-label-my-products">
            {calculateTotalPrice()}
            <span> {currency}</span>
          </p>
        </div>
      </div>

      <div className="product-collection">
        {productContainer.products.filter(product => product.productCategory === selectedCategories.selected || selectedCategories.selected === "ALL").map(sup => {
          return (
            <MyProductCard
              currency={currency}
              removeProduct={() => removeProductFromCategory(eventId, sup.id)}
              eventId={eventId}
              product={{
                id: sup.id,
                name: sup.name,
                price: sup.price
              }}
              user={{
                id: sup.userId,
                picUrl: sup.picUrl,
                username:sup.user,
                isEventAdmin: isEventAdmin
              }}
              key={`my-product-${sup.id}-${sup.userId}`}
              category={sup.productCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

MyProducts.propTypes = {
  eventId: PropTypes.string.isRequired,
  isEventAdmin: PropTypes.bool.isRequired,
  supCont: PropTypes.array,
  currency: PropTypes.string.isRequired
};

export default MyProducts;
