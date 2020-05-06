import React, { useState, useEffect } from "react";
import Avatar from "../../../../components/Avatar";
import { Button, EditButton } from "../../../../components/Button";
// import { loggedInUser } from "../../../../mockData";
import { adminService } from "../../../../Authentication/service";
import "./UserProfile.scss";

const UserProfile = ({ userDetails }) => {
    const [userInfo, setUserInfo] = useState({
        id: "",
        username: "Loading ...",
        email: "Loading ...",
        datejoined: "Loading ...",
        avatarUrl: "/default-avatar.png",
        name: "Loading ...",
        surname: "Loading ..."
    });
    const [editState, setEdit] = useState({
        delete: false,
        admin: false,
        ban: false
    });
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
                surname: userDetails.surname
            })
        }
        return () => {
            __isMounted = false;
        };
    }, [userDetails.id, userDetails.username, userDetails.email, userDetails.joined, userDetails.picUrl, userDetails.name, userDetails.surname]);


    const editDelete = () => {
        setEdit({...editState, delete: !editState.delete});
    };
    const editPromote = () => {
         setEdit({...editState, admin: !editState.admin});
    };
    const editBan = () => {
         setEdit({...editState, ban: !editState.ban});
    };

    const deleteAccount = () => {
        console.log("deleteing an account");
        console.log(userInfo.id);
        adminService.deleteUser(userInfo.id)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const promoteToAdmin = () => {
        adminService.grantUserAdmin(userInfo.id)
            .then(res => {
                console.log(res);
            })
    }

    const banUser = () => {
       console.log(userInfo.id);
    }
    return (
        <div className="user-profile-container">
            <div className="user-profile">
                <Avatar imageLink={userInfo.avatarUrl} />
            </div>
            <div className="user-profile-info">
                <strong>name:</strong>
                <p>{userInfo.name}</p>
                <strong>surname:</strong>
                <p>{userInfo.surname}</p>
                <strong>username:</strong>
                <p>{userInfo.username}</p>
                <strong>email:</strong>
                <p>{userInfo.email}</p>
                <strong>date joined:</strong>
                <p>{userInfo.datejoined}</p>
            </div>
            <EditButton
                options={editState.delete}
                activate={editDelete}
                cancel={editDelete}
                confirm={deleteAccount}
                tags
                render={<><i className="far fa-trash-alt" />delete user</>} />
            <EditButton
                options={editState.admin}
                activate={editPromote}
                cancel={editPromote}
                confirm={promoteToAdmin}
                tags
                render={<><i className="fas fa-star" />promote to admin</>} />
            <EditButton
                options={editState.ban}
                activate={editBan}
                cancel={editBan}
                confirm={banUser}
                tags
                render={<><i className="fas fa-ban" />ban user</>} />
        </div>)
}

export default UserProfile;