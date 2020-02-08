/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import ThreeDots from "../ThreeDots/ThreeDots";
import Button from "../button/Button";
import "./SupplyUserTile.scss";
import Form from "../Form/Form";
import TextInput from "../Inputs/TextInput/TextInput";
import EditInput from "../Inputs/EditInput/EditInput";

const SupplyUserTile = ({ user, supply, price, picUrl }) => {
  const [tileSupply, setTileSuply] = useState({
    user: user,
    supply: supply,
    price: price
  });

  const [editState, setEditState] = useState({ edit: false });

  const [tileState, tileStateSet] = useState({ options: false });

  const changeOptions = () => {
    tileStateSet({ options: !tileState.options });
  };

  const onChangeHandler = event => {
    setTileSuply({
      ...tileSupply,
      [`${event.target.name}`]: event.target.value
    });
    console.log(tileSupply);
  };

  const editHandler = () => {
    setEditState({ edit: !editState.edit });
  };

  // const update

  return (
    <div className="OuterSupplyTile">
      <div className="UserTileBody">
        <div>
          <Avatar imageLink={picUrl} />
          <span className="SuplyNameLabel">
            {!editState.edit ? (
              <span>
                <strong>{`${tileSupply.price} Zł: `}</strong>
                {tileSupply.supply}
              </span>
            ) : (
              <span className="editControlls">
                <EditInput
                  value={tileSupply.price}
                  onChange={onChangeHandler}
                  placeholder="Price"
                  name="price"
                />
                <EditInput
                  value={tileSupply.supply}
                  onChange={onChangeHandler}
                  placeholder="Supply name"
                  name="supply"
                />
              </span>
            )}
          </span>
        </div>
        <ThreeDots clicked={changeOptions} />
      </div>
      {tileState.options ? (
        editState.edit ? (
          <div className="Options">
            <Button clicked={editHandler} classes="btn-sm btn-orangeGradient">
              <i className="fas fa-times-circle" />
            </Button>
            <Button classes="btn-sm btn-blueGradient">
              <i className="fas fa-check" />
            </Button>
          </div>
        ) : (
          <div className="Options">
            <Button clicked={editHandler} classes="btn-sm btn-blueGradient">
              <i className="far fa-edit" />
            </Button>
            <Button classes="btn-sm btn-orangeGradient">
              <i className="far fa-trash-alt" />
            </Button>
          </div>
        )
      ) : null}
    </div>
  );
};
SupplyUserTile.defaultProps = {
  picUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLmktkJrArXh_zZVovazl5mb3lna9HXqPo7XvvviCSQAuru5C&s"
};

SupplyUserTile.propTypes = {
  user: PropTypes.string.isRequired,
  supply: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  picUrl: PropTypes.string
};

export default SupplyUserTile;
