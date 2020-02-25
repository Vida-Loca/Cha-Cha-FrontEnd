/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { Button, IconButton, EditButton } from "../../Button";
import "./ProductCard.scss";
import { TextInputNL } from "../../Inputs";

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
        <div>
          <Avatar />
          <span className="product-info">
            {!editState ? (
              <>
                <span>
                  <span className="product-currency">PLN</span>
                  <TextInputNL
                    onChange={onChangeHandler}
                    value={tileSupply.price}
                    placeholder="price"
                    name="price"
                    size="input-sm"
                    classes="product-price"
                    disabled
                  />
                </span>

                <TextInputNL
                  onChange={onChangeHandler}
                  value={tileSupply.supply}
                  placeholder="supply"
                  name="supply"
                  size="input-sm"
                  disabled
                />
              </>
            ) : (
              <>
                <span>
                  <span className="product-currency">PLN</span>
                  <TextInputNL
                    onChange={onChangeHandler}
                    value={tileSupply.price}
                    placeholder="price"
                    name="price"
                    size="input-sm"
                    classes="product-price"
                  />
                </span>
                <TextInputNL
                  onChange={onChangeHandler}
                  value={tileSupply.supply}
                  placeholder="supply"
                  name="supply"
                  size="input-sm"
                />
              </>
            )}
          </span>
        </div>
        {tileState ? (
          <div>
            <EditButton
              options={deleteState}
              activate={deleteHandler}
              cancel={deleteHandler}
            />
            <EditButton
              options={editState}
              activate={editHandler}
              cancel={cancelEdit}
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
