import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import ThreeDots from "../ThreeDots/ThreeDots";
import Button from "../button/Button";
import "./SupplyUserTile.scss";
import Form from "../Form/Form";
import TextInput from "../Inputs/TextInput/TextInput";

const SupplyUserTile = ({ user, supply, price }) => {
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

  return (
    <div className="OuterSupplyTile">
      <div className="UserTileBody">
        <div>
          <Avatar imageLink="https://basicincome.org/wp-content/uploads/2018/12/profilepic.jpg" />
          <span className="SuplyNameLabel">
            {!editState.edit ? (
              <span>
                <strong>
                  {tileSupply.price}
                  zl -{" "}
                </strong>
                {tileSupply.supply}
              </span>
            ) : (
              <span>
                <TextInput
                  onChange={onChangeHandler}
                  placeholder="Price"
                  name="price"
                />
                <TextInput
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
            <Button classes="btn-sm btn-orangeGradient">
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

SupplyUserTile.propTypes = {
  user: PropTypes.string.isRequired,
  supply: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default SupplyUserTile;
