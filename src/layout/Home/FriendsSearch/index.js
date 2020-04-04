import React, { useState } from "react";
import { SearchBar } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
import { userService } from "../../../Authentication/service";
import PaginatedContainer from "../../../components/PaginatedContainer";
import UserCard from "../../../components/UserCard";
import { friends } from "../../../mockData";
import Spinner from "../../../components/Spinner";

import "./inviteFriends.scss";



const SearchFriends = () => {

    const [findUser, setfindUser] = useState({ username: "" });
    const [dislpayFriends, setDislpayFreinds] = useState({ users: [], spinner: false });


    const onChangeHandler = event => {
        setfindUser({
            ...findUser,
            [`${event.target.name}`]: event.target.value
        });

    };

    const sendAFriendRequest = (id) => {
        userService.inviteUserByID(id)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
    }

    const lookingForUsers = () => {
        setDislpayFreinds({ users: dislpayFriends.users, spinner: true });
        userService.getUsersByRegex(findUser.username)
            .then(res => {
                setDislpayFreinds({ users: res, spinner: false });
            }).catch(err => {
                setDislpayFreinds({ users: [], spinner: false });
                console.log(err)
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
                            items.map(ev => (
                                <UserCard key={ev.id} username={ev.username} imageUrl={ev.picUrl} showControlls>
                                    <Button clicked={() => sendAFriendRequest(ev.id)} classes="btn-blueGradient btn-sm">
                                        <i className="fas fa-user-plus" />
                                    </Button>
                                </UserCard>
                            ))
                }
            />
        </div>
    );
};

export default SearchFriends;
