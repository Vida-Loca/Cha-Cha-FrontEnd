import React, { useState } from "react";
import "./AdminEventTile.scss";
import ThreeDots from "../ThreeDots/ThreeDots";
import Button from "../button/Button";

const AdminEventTile = ({ id, name }) => {
  const [tileState, tileStateSet] = useState({ options: false });

  const changeOptions = () => {
    tileStateSet({ options: !tileState.options });
  };
  return (
    <div className="AdminUserTile">
      <span>{name}</span>
      <ThreeDots clicked={changeOptions} />
      {tileState.options ? (
        <div className="Osptions">
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

export default AdminEventTile;
