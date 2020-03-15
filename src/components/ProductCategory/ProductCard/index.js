/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { IconButton, EditButton } from "../../Button";
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

  const changeOptions = () => {
    tileStateSet(!tileState);
  };

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
    <div className="OuterSupplyTile">
      <div className="UserTileBody">
        <Avatar title={tileSupply.user} imageLink={tileSupply.picUrl} />
        <span className="product-info">
          <span>
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

        {tileState ? (
          <div>
            <EditButton
              options={deleteState}
              activate={deleteHandler}
              cancel={cancelDelete}
              render={<i className="far fa-trash-alt" />}
              confirm={deletingProduct}
            />
            <EditButton
              options={editState}
              activate={editHandler}
              cancel={cancelEdit}
              render={<i className="far fa-edit" />}
              confirm={updatingProduct}
            />
          </div>
        ) : (
            <IconButton clicked={changeOptions} iconClass="fas fa-ellipsis-v" />
          )}
      </div>
    </div>
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
