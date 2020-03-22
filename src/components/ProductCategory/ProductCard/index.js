/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { Button, EditButton } from "../../Button";
import "./ProductCard.scss";
import { TextInputNL, TextArea } from "../../Inputs";

const ProductCard = ({ id, user, supply, price, picUrl }) => {
  const [tileSupply, setTileSuply] = useState({
    user,
    supply,
    price: String(price),
    picUrl,
    tempSupply: supply,
    tempPrice: price
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

  const deletingProduct = () => {
    console.log(`deleting product with id: ${id}`)
  }

  const updatingProduct = () => {
    if (tileSupply.supply.length > 0 && tileSupply.price.length > 0 && !isNaN(tileSupply.price)) {
      setTimeout(() => {
        console.log(`updating product with id: ${id}`)
        console.log({
          price: tileSupply.price,
          supply: tileSupply.supply
        })

      }, 2000);
    } else {
      console.log("can't be updatted")
    }

  }

  return (
    <>
      <div className="product-card-container tooltip">
        {/* <span className={editState ? "tooltiptext tooltiptext-active" : "tooltiptext"}> */}
        {tileState && (
          <span className="tooltiptext">
            {!editState &&
              <EditButton
                options={deleteState}
                activate={deleteHandler}
                cancel={cancelDelete}
                render={<i className="far fa-trash-alt" />}
                confirm={deletingProduct}
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

        <Avatar title={tileSupply.user} imageLink={tileSupply.picUrl} />
        <span className="product-info">
          <span className="price-container">
            <span className="product-currency">PLN</span>
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
        <Button classes="options-btn" clicked={changeOptions}>
          {tileState ? <i className="fas fa-times" /> : <i className="fas fa-ellipsis-v" />}
        </Button>
      </div>
    </>

  );
};
ProductCard.defaultProps = {
  picUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLmktkJrArXh_zZVovazl5mb3lna9HXqPo7XvvviCSQAuru5C&s"
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  supply: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  picUrl: PropTypes.string
};

export default ProductCard;
