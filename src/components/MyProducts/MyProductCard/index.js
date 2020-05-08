/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Button, EditButton } from "../../Button";
import { TextInputNL, TextArea } from "../../Inputs";
import EditProductContainer from "../../../layout/EventTabs/Products/EditProductContainer";

import {FormContext} from "../../../context/FormContext";

import { productService } from "../../../Authentication/service";

import "./MyProductCard.scss";


const MyProductCard = ({removeProduct,updateProductList, eventId, product, category, currency }) => {


  const [tileSupply, setTileSuply] = useState({
    supply: product.name,
    price: String(product.price),
    tempSupply: product.name,
    tempPrice: String(product.price)
  });
  const [forms,setform] = useContext(FormContext);
  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const [tileState, tileStateSet] = useState(false);



  const onChangeHandlerPrice = event => {
    if (event.target.value.length < 20) {
      setTileSuply({
        ...tileSupply,
        [`${event.target.name}`]: event.target.value
      });
    };
  }
  const onChangeHandlerDescription = event => {
    if (event.target.value.length < 250) {
      setTileSuply({
        ...tileSupply,
        [`${event.target.name}`]: event.target.value
      });
    };
  }

  const changeOptions = () => {
    tileStateSet(!tileState);
    setDeleteState(false);
    setEditState(false);
    setTileSuply({
      ...tileSupply,
      supply: tileSupply.tempSupply,
      price: tileSupply.tempPrice
    });
  };

  const deleteHandler = () => {
    setDeleteState(!deleteState);
  };

  const cancelDelete = () => {
    setDeleteState(false);
    tileStateSet(false);
  };



  // const updatingProduct = () => {
  //   console.log(tileSupply);
  //   if (tileSupply.supply.length > 0 && tileSupply.price.length > 0 && !isNaN(tileSupply.price)) {
  //     console.log("updating");
  //     productService.updateProduct(eventId, product.id, {
  //       price: tileSupply.price,
  //       name: tileSupply.supply,
  //       productCategory: category
  //     })
  //       .then(_ => {
  //         setEditState(false);
  //         tileStateSet(false);
  //       }, err => {
  //         console.log(err);
  //       })

  //   } else {
  //     console.log("can't be updatted")
  //   }
  // }

  const EditProductModal = (id,name, quantity, price) => {
    console.log(name);
    setform({ ...forms, renderForm: <EditProductContainer 
      updateProductInList={updateProductList}
      eventId={eventId} 
      prodId={id} 
      category={category} 
      name={name} 
      quantity={quantity} 
      price={price}  
      />, 
      show: true });
  };

  return (
      <div className="my-product-card-container tooltip">
        {tileState && (
          <span className="tooltiptext">
            {!editState &&
              <EditButton
                options={deleteState}
                activate={deleteHandler}
                cancel={cancelDelete}
                render={<i className="far fa-trash-alt" />}
                confirm={removeProduct}
              />}

            {!deleteState &&
              <EditButton
                options={editState}
                activate={() => EditProductModal(product.id, product.name, product.quantity, product.price)}
                cancel={() => {}}
                render={<i className="far fa-edit" />}
                confirm={() => {}}
              />}

          </span>
        )}

        <div className="product-info">
          <span className="price-header">
            <span className="product-quantity">{product.quantity}</span>
            <span className="product-times"><i className="fas fa-times"/></span>
            <span className="product-price">{product.price}</span>
            <span className="product-currency">{currency}</span>
            <span className="product-category">{category}</span>

          </span>
          <div className="product-name">
            {product.name}
          </div>
        </div>
        <Button classes="options-btn" clicked={changeOptions}>
          {tileState ? <i className="fas fa-times" /> : <i className="fas fa-ellipsis-v" />}
        </Button>

      </div>
  );
};

MyProductCard.propTypes = {
  eventId: PropTypes.string.isRequired,
  removeProduct: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  category: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired

};

export default MyProductCard;
