import React, { useState, useEffect, useContext } from "react";
import Avatar from "../../../../components/Avatar";
import { Button, EditButton } from "../../../../components/Button";
// import { loggedInUser } from "../../../../mockData";
import { adminService } from "../../../../Authentication/service";
import { FlashMessageContext } from "../../../../context/FlashMessageContext";

import "./UserProfile.scss";

const UserProfile = ({ userDetails }) => {
    const [userInfo, setUserInfo] = useState({
        id: "",
        username: "Loading ...",
        email: "Loading ...",
        datejoined: "Loading ...",
        avatarUrl: "/default-avatar.png",
        name: "Loading ...",
        surname: "Loading ...",
        banned: false
    });
    const [editState, setEdit] = useState({
        delete: false,
        admin: false,
        ban: false
    });

    const [, setFlashMessage] = useContext(FlashMessageContext);

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
                isAdmin: false
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

    const flashMessageOpen = () =>{
        setFlashMessage({
        message: "hello",
        show: true,
        messageState: "success"})
      }

    return (
        <div className="user-profile-container">
            <div className="user-profile">
                <Avatar imageLink={userInfo.avatarUrl} />
                
                {
                    userInfo.isAdmin
                    ? <div><i className="fas fa-star" /> Admin</div>
                    :  (userInfo.banned
                        ? null
                        : <EditButton
                            options={editState.admin}
                            activate={editPromote}
                            cancel={editPromote}
                            confirm={promoteToAdmin}
                            classes="promote"
                            tags
                            render={<><i className="fas fa-star" />promote to admin</>} 
                            />)
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
                !userInfo.isAdmin 
                && <EditButton
                options={editState.delete}
                activate={editDelete}
                cancel={editDelete}
                confirm={flashMessageOpen}
                classes="delete"
                tags
                render={<><i className="far fa-trash-alt" />delete user</>} />
            }

           {
               userInfo.banned
               ? (
                <EditButton
                options={editState.ban}
                activate={editBan}
                cancel={editBan}
                confirm={banUser}
                classes="ban"
                tags
                render={<><i className="fas fa-ban" />unban</>} />
               )
               : (
                <EditButton
                options={editState.ban}
                activate={editBan}
                cancel={editBan}
                confirm={banUser}
                classes="ban"
                tags
                render={<><i className="fas fa-ban" />ban user</>} />
               )
           }
        </div>)
}

export default UserProfile;