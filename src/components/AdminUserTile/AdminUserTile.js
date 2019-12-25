import React, { useState } from "react";
import "./AdminUserTile.scss";
import Avatar from "../Avatar/Avatar";
import ThreeDots from "../ThreeDots/ThreeDots";
import Button from "../button/Button";

const AdminUserTile = ({ id, image, name, openModal }) => {
  const [tileState, tileStateSet] = useState({ options: false });

  const changeOptions = () => {
    tileStateSet({ options: !tileState.options });
  };
  return (
    <div className="AdminUserTile">
      <Avatar imageLink={image} />
      <span>{name}</span>
      <ThreeDots clicked={changeOptions} />
      {tileState.options ? (
        <div className="Osptions">
          <Button
            // clicked={() => openModal(user)}
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

export default AdminUserTile;
