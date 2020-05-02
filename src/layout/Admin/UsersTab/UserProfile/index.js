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
    const [editState, setEdit] = useState(false);
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


    const editHandler = () => {
        setEdit(!editState);
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
    return (
        <div className="user-profile-container">
            <div className="user-profile">
                <Avatar imageLink={userInfo.avatarUrl} />

                <Button clicked={promoteToAdmin} classes="promote-btn btn-sm btn-orangeGradient">promote to Admin</Button>
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
                options={editState}
                activate={editHandler}
                cancel={editHandler}
                confirm={deleteAccount}
                tags
                render={<><i className="far fa-trash-alt" />delete</>} />
        </div>)
}

export default UserProfile;