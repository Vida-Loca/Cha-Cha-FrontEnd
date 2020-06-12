/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Avatar from "../../../../components/Avatar";
import { EditButton } from "../../../../components/Button";
// import { loggedInUser } from "../../../../mockData";
import { adminService } from "../../../../Authentication/service";
import { FlashMessageContext } from "../../../../context/FlashMessageContext";
import { FormContext } from "../../../../context/FormContext";

import "./UserProfile.scss";

const UserProfile = ({
  promoteToAdminInList, removeUserFromList, banUserInList, userDetails, isAdmin,
}) => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "Loading ...",
    email: "Loading ...",
    datejoined: "Loading ...",
    avatarUrl: "/default-avatar.png",
    name: "Loading ...",
    surname: "Loading ...",
    banned: false,
  });
  const [editState, setEdit] = useState({
    delete: false,
    admin: false,
    ban: false,
  });

  const [, setFlashMessage] = useContext(FlashMessageContext);
  const [, setForm] = useContext(FormContext);

  useEffect(() => {
    let __isMounted = true;
    if (__isMounted) {
      setUserInfo({
        id: userDetails.id,
        username: userDetails.username,
        email: userDetails.email,
        datejoined: userDetails.joined.substring(0, 10),
        avatarUrl: userDetails.picUrl,
        name: userDetails.name,
        surname: userDetails.surname,
        banned: userDetails.banned,
      });
    }
    return () => {
      __isMounted = false;
    };
  }, [
    userDetails.id,
    userDetails.name,
    userDetails.email,
    userDetails.joined,
    userDetails.picUrl,
    userDetails.surname,
    userDetails.username,
  ]);


  const editDelete = () => {
    setEdit({ ...editState, delete: !editState.delete });
  };
  const editPromote = () => {
    setEdit({ ...editState, admin: !editState.admin });
  };
  const editBan = () => {
    setEdit({ ...editState, ban: !editState.ban });
  };

  const deleteAccount = () => {
    adminService.deleteUser(userInfo.id)
      .then((res) => {
        console.log("res", res);
        setFlashMessage({
          message: `user ${userInfo.username} has been succesfully deleted`,
          show: true,
          messageState: "success",
        });
        setForm({ renderForm: "", show: false });
        removeUserFromList(userInfo.id);
      })
      .catch((err) => {
        console.log("err", err);
        setFlashMessage({
          message: "there has been a problem with deleting this user",
          show: true,
          messageState: "warning",
        });
      });
  };

  const promoteToAdmin = () => {
    adminService.grantUserAdmin(userInfo.id)
      .then(() => {
        setFlashMessage({
          message: `user ${userInfo.username} has ben promoted to admin`,
          show: true,
          messageState: "success",
        });
        setForm({ renderForm: "", show: false });
        promoteToAdminInList(userInfo.id);
      })
      .catch(() => {
        setFlashMessage({
          message: "can't promote user to admin",
          show: true,
          messageState: "warning",
        });
      });
  };

  const banUser = () => {
    adminService.banUserByID(userInfo.id)
      .then((res) => {
        setFlashMessage({
          message: res.banned ? `user ${userInfo.username} has ben banned` : `user ${userInfo.username} has ben pardoned`,
          show: true,
          messageState: "success",
        });
        setForm({ renderForm: "", show: false });
        banUserInList(userInfo.id, res.banned);
      })
      .catch(() => {
        setFlashMessage({
          message: "can't ban user",
          show: true,
          messageState: "warning",
        });
      });
  };

  const isUserBannedRender = () => (userInfo.banned ? null
    : (
      <EditButton
        options={editState.admin}
        activate={editPromote}
        cancel={editPromote}
        confirm={promoteToAdmin}
        classes="promote"
        tags
        render={(
          <>
            <i className="fas fa-star" />
            promote to admin
          </>
        )}
      />
    ));


  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <Avatar imageLink={userInfo.avatarUrl} />

        {
          isAdmin ? (
            <div>
              <i className="fas fa-star" />
              {" "}
              Admin
            </div>
          )
            : (isUserBannedRender())
        }

      </div>
      <div className="user-profile-info">
        <span>name:</span>
        <p>{userInfo.name}</p>
        <span>surname:</span>
        <p>{userInfo.surname}</p>
        <span>username:</span>
        <p>{userInfo.username}</p>
        <span>email:</span>
        <p>{userInfo.email}</p>
        <span>date joined:</span>
        <p>{userInfo.datejoined}</p>
      </div>
      {
        !isAdmin
        && (
          <EditButton
            options={editState.delete}
            activate={editDelete}
            cancel={editDelete}
            confirm={deleteAccount}
            classes="delete"
            tags
            render={(
              <>
                <i className="far fa-trash-alt" />
                delete user
              </>
            )}
          />
        )
      }

      {
        !isAdmin && (
          userInfo.banned
            ? (
              <EditButton
                options={editState.ban}
                activate={editBan}
                cancel={editBan}
                confirm={banUser}
                classes="ban"
                tags
                render={(
                  <>
                    <i className="fas fa-ban" />
                    unban
                  </>
                )}
              />
            )
            : (
              <EditButton
                options={editState.ban}
                activate={editBan}
                cancel={editBan}
                confirm={banUser}
                classes="ban"
                tags
                render={(
                  <>
                    <i className="fas fa-ban" />
                    ban user
                  </>
                )}
              />
            )
        )
      }
    </div>
  );
};

UserProfile.propTypes = {
  promoteToAdminInList: PropTypes.func.isRequired,
  removeUserFromList: PropTypes.func.isRequired,
  banUserInList: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userDetails: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default UserProfile;
