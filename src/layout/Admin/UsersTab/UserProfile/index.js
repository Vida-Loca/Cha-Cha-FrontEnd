import React, { useState, useEffect } from "react";
import Avatar from "../../../../components/Avatar";
import { Button, EditButton } from "../../../../components/Button";
import { loggedInUser } from "../../../../mockData";


const UserProfile = () => {
    const [userInfo, setUserInfo] = useState({
        username: "Loading ...",
        email: "Loading ...",
        datejoined: "Loading ...",
        avatarUrl: "",
        name: "Loading ...",
        surname: "Loading ..."
    });
    const [editState, setEdit] = useState(false);
    useEffect(() => {
        let __isMounted = true;
        setTimeout(() => {
            if (__isMounted) {
                setUserInfo({
                    username: loggedInUser.username,
                    email: loggedInUser.email,
                    datejoined: loggedInUser.joined.substring(0, 10),
                    avatarUrl: loggedInUser.picUrl,
                    name: loggedInUser.name,
                    surname: loggedInUser.surname
                })
            }

        }, 1000);
        return () => {
            __isMounted = false;
        };
    }, []);


    const editHandler = () => {
        setEdit(!editState);
    };

    const deleteAccount = () => {
        console.log("deleteing an account");
    }
    return (
        <div className="user-profile-container">
            <Avatar imageLink={userInfo.avatarUrl} />
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
                render={
                    <><i className="far fa-trash-alt" />delete</>} />
            <Button classes="btn-sm btn-orangeGradient">
                promote to Admin
          </Button>
        </div>)
}

export default UserProfile;