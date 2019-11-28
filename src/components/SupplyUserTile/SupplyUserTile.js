import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import Button from "../button/Button";
import "./SupplyUserTile.scss";

const SupplyUserTile = ({ user, supply, price, openModal }) => {
  const [tileState, tileStateSet] = useState({ options: false });

  const changeOptions = () => {
    tileStateSet({ options: !tileState.options });
  };

  return (
    <div className="UserTileBody" onClick={changeOptions}>
      {/* <div className="OptionOverlay">.sss.</div> */}
      <Avatar imageLink="https://basicincome.org/wp-content/uploads/2018/12/profilepic.jpg" />
      <div className="NameAndPrice">
        <span className="UsernameLabel">{user}</span>
        <span className="price">{price}zl</span>
      </div>
      <span className="SuplyNameLabel">{supply}</span>

      {tileState.options ? (
        <div className="Options">
          <Button
            clicked={() => openModal(user)}
            classes="btn-sm btn-blueGradient"
          >
            <i className="far fa-edit" />
          </Button>
          <Button classes="btn-sm btn-orangeGradient">
            <i className="far fa-trash-alt" />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

SupplyUserTile.propTypes = {
  user: PropTypes.string.isRequired,
  supply: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func
};

export default SupplyUserTile;
