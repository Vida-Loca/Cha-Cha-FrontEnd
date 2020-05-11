/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { Button, EditButton } from "../../Button";
import "./ProductCard.scss";
import { UserContext } from "../../../context/UserContext";
import { FormContext } from "../../../context/FormContext";
import EditProductContainer from "../../../layout/EventTabs/Products/EditProductContainer";


const ProductCard = ({removeProduct, updateProductList,eventId, product, category, user, currency }) => {

  const [loggedInUser,] = useContext(UserContext);
  const [forms,setform] = useContext(FormContext);

  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const [tileState, tileStateSet] = useState(false);

  const EditProductModal = (id,name, quantity, price) => {
    setform({ ...forms, 
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
      show: true });
  };



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



  return (
    <>
      <div className="product-card-container tooltip">
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

        <Avatar title={user.username} imageLink={user.picUrl} />
        <div className="product-info">
          <span className="price-header">
            <span className="product-quantity">{product.quantity}</span>
            <span className="product-times"><i className="fas fa-times"/></span>
            <span className="product-price">{product.price}</span>
            <span className="product-currency">{currency}</span>
          </span>
          <div className="product-name">
            {product.name}
          </div>
        </div>
        {(loggedInUser.user.id === user.id || user.isEventAdmin)
          && <Button classes="options-btn" clicked={changeOptions}>
            {tileState ? <i className="fas fa-times" /> : <i className="fas fa-ellipsis-v" />}
          </Button>}

      </div>
    </>
  );
};

ProductCard.propTypes = {
  eventId: PropTypes.string.isRequired,
  removeProduct: PropTypes.func,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    picUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    isEventAdmin: PropTypes.bool.isRequired
  }).isRequired,
  category: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired

};

export default ProductCard;
