/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Button, EditButton } from "../../Button";
import EditProductContainer from "../../../layout/EventTabs/Products/EditProductContainer";

import { FormContext } from "../../../context/FormContext";

import "./MyProductCard.scss";


const MyProductCard = ({
  removeProduct, updateProductList, eventId, product, category, currency,
}) => {
  const [forms, setform] = useContext(FormContext);
  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const [tileState, tileStateSet] = useState(false);


  const changeOptions = () => {
    tileStateSet(!tileState);
    setDeleteState(false);
    setEditState(false);
  };

  const deleteHandler = () => {
    setDeleteState(!deleteState);
  };

  const cancelDelete = () => {
    setDeleteState(false);
    tileStateSet(false);
  };


  const EditProductModal = (id, name, quantity, price) => {
    setform({
      ...forms,
      renderForm:
  <EditProductContainer
    updateProductInList={updateProductList}
    eventId={eventId}
    prodId={id}
    category={category}
    name={name}
    quantity={quantity}
    price={price}
  />,
      show: true,
    });
  };

  return (
    <div className="my-product-card-container tooltip">
      {tileState && (
        <span className="tooltiptext">
          {!editState
            && (
            <EditButton
              options={deleteState}
              activate={deleteHandler}
              cancel={cancelDelete}
              render={<i className="far fa-trash-alt" />}
              confirm={removeProduct}
            />
            )}

          {!deleteState
            && (
            <EditButton
              options={editState}
              // eslint-disable-next-line max-len
              activate={() => EditProductModal(product.id, product.name, product.quantity, product.price)}
              cancel={() => { }}
              render={<i className="far fa-edit" />}
              confirm={() => { }}
            />
            )}

        </span>
      )}

      <div className="product-info">
        <span className="price-header">
          <span className="product-quantity">{product.quantity}</span>
          <span className="product-times"><i className="fas fa-times" /></span>
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
  updateProductList: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  category: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default MyProductCard;
