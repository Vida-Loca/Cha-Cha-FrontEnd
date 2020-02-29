import React, { useState } from "react";
import "./AdminUserTile.scss";
import Avatar from "../Avatar";

import { Button, IconButton } from "../Button";

const AdminUserTile = ({ id, image, name }) => {
  const [tileState, tileStateSet] = useState({ options: false });

  const changeOptions = () => {
    tileStateSet({ options: !tileState.options });
  };
  return (
    <div className="AdminUserTile">
      <Avatar imageLink={image} />
      <span>{name}</span>
      <IconButton clicked={changeOptions} iconClass="fas fa-ellipsis-v" />
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

export default AdminUserTile;
