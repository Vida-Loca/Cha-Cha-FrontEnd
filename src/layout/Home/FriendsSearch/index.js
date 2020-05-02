import React, { useState, useContext } from "react";
import { SearchBar } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { userService } from "../../../Authentication/service";
import PaginatedContainer from "../../../components/PaginatedContainer";
import UserCard from "../../../components/UserCard";
import Spinner from "../../../components/Spinner";
import { UserContext } from "../../../context/UserContext";
// import { friends } from "../../../mockData";

import "./inviteFriends.scss";

const SearchFriends = () => {

    const [findUser, setfindUser] = useState({ username: "" });
    const [friendsList, setFriendsList] = useState([]);
    const [dislpayFriends, setDislpayFreinds] = useState({ users: [], spinner: false });
    const [loggedInUser,] = useContext(UserContext);

    const onChangeHandler = event => {
        setfindUser({
            ...findUser,
            [`${event.target.name}`]: event.target.value
        });
    };

    const sendAFriendRequest = (id) => {
        userService.inviteUserByID(id)
            .then(_ => {
                let newEl = dislpayFriends.users.map(user =>{
                    if(user.id === id){
                        return {...user, sent: true};
                    } else{
                        return user;
                    }
                });
                setDislpayFreinds({users: newEl, spinner: false});
            });
    }

    const lookingForUsers = () => {
        userService.getFriendsList()
            .then(res => {
                setFriendsList(res);
            }, _ => {
                setFriendsList([]);
            });
        userService.getUsersByRegex(findUser.username)
            .then(res => {
                let letfilteredUser = res.filter(user => user.id !== loggedInUser.user.id);
                let addedSentParam = letfilteredUser.map(user => ({...user, sent: false}));
                setDislpayFreinds({ users: addedSentParam, spinner: false });
                // setDislpayFreinds({ users: , spinner: false });
            }, _ => {
                setDislpayFreinds({ users: [], spinner: false });
            });
    }

    return (
        <div className="invite-friends">
            <SearchBar
                onChange={onChangeHandler}
                placeholder="search ..."
                name="username"
                value={findUser.username}
                clicked={lookingForUsers}
            />
            <PaginatedContainer
                title=""
                items={dislpayFriends.users}
                perPage={5}
                noContentMsg=""
                render={
                    dislpayFriends.spinner
                        ? () => <Spinner size={"spinner-sm"} />
                        : ({ items }) =>
                            items.map(ev => {
                                const isUserAFriend = friendsList.filter(user => user.id === ev.id);
                                return (
                                    <UserCard key={ev.id} username={ev.username} imageUrl={ev.picUrl} showControlls>
                                        {!isUserAFriend.length > 0 &&
                                            <Button clicked={() => sendAFriendRequest(ev.id)} classes="btn-blueGradient-icon btn-sm">
                                                {
                                                    ev.sent 
                                                    ? <i className="fas fa-check" />
                                                    : <i className="fas fa-user-plus" />
                                                }
                                            </Button>}
                                    </UserCard>
                                )
                            })
                }
            />
        </div>
    );
};

export default SearchFriends;
