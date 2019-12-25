import React, { useState } from "react";
import AdminUserTile from "../../../components/AdminUserTile/AdminUserTile";
import { tempUsers } from "./Data/TempData";
import "./UserLayout.scss";

const UsersLayout = ({ openModal }) => {
  const [users, setUsers] = useState(tempUsers);
  return (
    <div className="Users">
      {users.map(user => {
        return (
          <AdminUserTile
            key={user.id}
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

export default UsersLayout;