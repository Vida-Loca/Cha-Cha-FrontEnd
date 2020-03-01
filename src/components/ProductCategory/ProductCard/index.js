/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { IconButton, EditButton } from "../../Button";
import "./ProductCard.scss";
import { TextInputNL, TextArea } from "../../Inputs";

const ProductCard = ({ user, supply, price, picUrl }) => {
  const [tileSupply, setTileSuply] = useState({
    user,
    supply,
    price,
    tempSupply: supply,
    tempPrice: price
  });

  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const [tileState, tileStateSet] = useState(false);

  const changeOptions = () => {
    tileStateSet(!tileState);
  };

  const onChangeHandler = event => {
    setTileSuply({
      ...tileSupply,
      [`${event.target.name}`]: event.target.value
    });
    console.log(tileSupply);
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

  // const update

  return (
    <div className="OuterSupplyTile">
      <div className="UserTileBody">
        <Avatar title={tileSupply.user} />
        <span className="product-info">
          <span>
            <span className="product-currency">PLN</span>
            <TextInputNL
              onChange={onChangeHandler}
              value={tileSupply.price}
              placeholder="price"
              name="price"
              size="input-sm"
              classes="product-price"
              disabled={!editState}
            />
          </span>
          <TextArea
            value={tileSupply.supply}
            name="supply"
            onChange={onChangeHandler}
            disabled={!editState}
          />
        </span>

        {tileState ? (
          <div>
            <EditButton
              options={deleteState}
              activate={deleteHandler}
              cancel={cancelDelete}
              render={<i className="far fa-trash-alt" />}
            />
            <EditButton
              options={editState}
              activate={editHandler}
              cancel={cancelEdit}
              render={<i className="far fa-edit" />}
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
  picUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLmktkJrArXh_zZVovazl5mb3lna9HXqPo7XvvviCSQAuru5C&s"
};

ProductCard.propTypes = {
  user: PropTypes.string.isRequired,
  supply: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  picUrl: PropTypes.string
};

export default ProductCard;
