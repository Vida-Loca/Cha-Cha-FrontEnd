/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { Button, EditButton } from "../../Button";
import "./ProductCard.scss";
import { TextInputNL, TextArea } from "../../Inputs";
import { UserContext } from "../../../context/UserContext";

import { productService } from "../../../Authentication/service";

const ProductCard = ({removeProduct, eventId, product, category, user, currency }) => {

  const [loggedInUser,] = useContext(UserContext);

  const [tileSupply, setTileSuply] = useState({
    supply: product.name,
    price: String(product.price),
    tempSupply: product.name,
    tempPrice: String(product.price)
  });

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
  const editHandler = () => {
    setEditState(!editState);
  };

  const cancelDelete = () => {
    setDeleteState(false);
    tileStateSet(false);
  };

  const cancelEdit = () => {
    setEditState(false);
    tileStateSet(false);
    setTileSuply({
      ...tileSupply,
      supply: tileSupply.tempSupply,
      price: tileSupply.tempPrice
    });
  };

  const updatingProduct = () => {
    console.log(tileSupply);
    if (tileSupply.supply.length > 0 && tileSupply.price.length > 0 && !isNaN(tileSupply.price)) {
      console.log("updating");
      productService.updateProduct(eventId, product.id, {
        price: tileSupply.price,
        name: tileSupply.supply,
        productCategory: category
      })
        .then(_ => {
          setEditState(false);
          tileStateSet(false);
        }, err => {
          console.log(err);
        })

    } else {
      console.log("can't be updatted")
    }
  }

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
                activate={editHandler}
                cancel={cancelEdit}
                render={<i className="far fa-edit" />}
                confirm={updatingProduct}
              />}

          </span>
        )}

        <Avatar title={user.username} imageLink={user.picUrl} />
        <span className="product-info">
          <span className="price-container">
            <span className="product-currency">{currency}</span>
            <TextInputNL
              onChange={onChangeHandlerPrice}
              value={tileSupply.price}
              placeholder="price"
              name="price"
              size="input-sm"
              classes="product-price"
              disabled={!editState}
            />
          </span>
          <TextArea value={tileSupply.supply} name="supply" onChange={onChangeHandlerDescription} disabled={!editState} />
        </span>
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
  removeProduct: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
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
