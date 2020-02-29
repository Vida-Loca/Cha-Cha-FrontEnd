import React, { useState } from "react";
import AdminUserTile from "../../../components/AdminUserTile/AdminUserTile";
import { allUsers } from "../../../mockData";
import "./UserLayout.scss";

const UsersLayout = () => {
  const users = useState(allUsers)[0];
  return (
    <div className="Users">
      {users.map(user => {
        return (
          <AdminUserTile
            key={user.id}
            id={user.id}
            name={user.name}
            image={user.image}
          />
        );
      })}
    </div>
  );
};

export default UsersLayout;
