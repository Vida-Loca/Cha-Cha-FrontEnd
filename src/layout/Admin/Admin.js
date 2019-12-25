import React, { useState } from "react";
import "./Admin.scss";
import { tempUsers } from "./Data/TempData";

import AdminUserTile from "../../components/AdminUserTile/AdminUserTile";

const Admin = ({ openModal }) => {
  const [users, setUsers] = useState(tempUsers);

  return (
    <div className="AdminLayoutBody">
      {users.map(user => {
        return (
          <AdminUserTile
            id={user.id}
            openModal={openModal}
            name={user.name}
            image={user.image}
          />
        );
      })}
    </div>
  );
};

export default Admin;
