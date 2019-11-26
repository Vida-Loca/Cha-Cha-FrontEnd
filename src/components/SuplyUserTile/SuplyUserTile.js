import React from "react";
import "./SuplyUserTile.scss";

const SuplyUserTile = ({ user, quantity, supply, price }) => {
  return (
    <div className="UserTileBody">
      <span className="UsernameLabel">{user}</span>
      <span className="quantityLabel">{quantity}</span>
      <span className="SuplyNameLabel">{supply}</span>
      <span className="price">{price}</span>
    </div>
  );
};

export default SuplyUserTile;
