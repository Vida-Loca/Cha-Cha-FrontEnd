import React, { useState, useContext, useEffect } from "react";
import { TextInput } from "../../../components/Inputs";
import { Button } from "../../../components/Button";
// import { userService } from "../../../../Authentication/service";
import PaginatedContainer from "../../../components/PaginatedContainer";
import UserCard from "../../../components/UserCard";
import { friends } from "../../../mockData";



const SearchFriends = () => {

    const [findUser, setfindUser] = useState({ username: "" });
    const [dislpayFriends, setDislpayFreinds] = useState([]);


    const onChangeHandler = event => {
        setfindUser({
            ...findUser,
            [`${event.target.name}`]: event.target.value
        });

    };

    const sendAFriendRequest = (username) => {
        console.log(`sending a friend request to ... ${username}`)
    }

    const lookingForUsers = () => {
        console.log(`looking for users with username ${findUser.username}`)
        setTimeout(() => {
            console.log("found something");
            setDislpayFreinds(friends);
        }, 2000);
    }

    return (
        <div className="invite-friends">
            <TextInput onChange={onChangeHandler} placeholder="Username" classes="input-blue" name="username" />
            <Button clicked={lookingForUsers} classes="btn-blueGradient btn-sm">search</Button>

            <PaginatedContainer
                title="Invite friends"
                items={dislpayFriends}
                perPage={5}
                render={({ items }) =>
                    items.map(ev => (
                        <UserCard key={ev.username} username={ev.username} showControlls>
                            <Button clicked={() => sendAFriendRequest(ev.username)} classes="btn-blueGradient btn-sm">
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
