import React, { useState } from "react";
import "./Members.scss";
import UserTile from "../../../components/UserTile/UserTile";
import Button from "../../../components/button/Button";

const Members = props => {
  const [members, setMembers] = useState({
    members: [
      { username: "Darko" },
      { username: "marko" },
      { username: "RuslanOVan" },
      { username: "KlikoKLako" }
    ],
    requests: [{ username: "KOloko" }]
  });

  return (
    <div className="MembersContainer">
      <Button classes="btn-blueGradient btn-md">+ Add User</Button>
      <h2>Pending requests ● {members.members.length}</h2>
      {members.members.map((member, key) => {
        return (
          <UserTile
            username={member.username}
            buttonName="accept"
            buttonClass="btn-blueGradient btn-sm"
            key={key}
          />
        );
      })}

      <h2>Members ● {members.requests.length}</h2>
      {members.requests.map((member, key) => {
        return (
          <UserTile
            username={member.username}
            buttonName="kick"
            buttonClass="btn-orangeGradient btn-sm"
            key={key}
          />
        );
      })}
    </div>
  );
};

export default Members;
