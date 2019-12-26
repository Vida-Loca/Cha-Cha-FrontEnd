import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import ThreeDots from "../ThreeDots/ThreeDots";
import Button from "../button/Button";
import "./SupplyUserTile.scss";

const SupplyUserTile = ({ user, supply, price }) => {
  const [tileState, tileStateSet] = useState({ options: false });

  const changeOptions = () => {
    tileStateSet({ options: !tileState.options });
  };

  return (
    <div className="OuterSupplyTile">
      <div className="UserTileBody">
        <div>
          <Avatar imageLink="https://basicincome.org/wp-content/uploads/2018/12/profilepic.jpg" />
          <span className="SuplyNameLabel">
            <strong>
              {price}
              zl -{" "}
            </strong>
            {supply}
          </span>
        </div>
        <ThreeDots clicked={changeOptions} />
      </div>
      {tileState.options ? (
        <div className="Options">
          <Button classes="btn-sm btn-blueGradient">
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
  price: PropTypes.number.isRequired
};

export default SupplyUserTile;
