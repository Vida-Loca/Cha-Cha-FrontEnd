import React, { useState } from "react";
import PaginatedContainer from "../../../components/PaginatedContainer";
import UserCard from "../../../components/UserCard";
import { Button } from "../../../components/Button";
import { friends, friendsRequests } from "../../../mockData";

const FriendsList = () => {

    const removeFromFriendsList = (username) => {
        console.log(`removing from friends list ${username}`)
    }
    const ignoreRequestFriendsList = (username) => {
        console.log(`ignore request from friends list ${username}`)
    }
    const acceptFriendsList = (username) => {
        console.log(`accepting from friends list ${username}`)
    }

    return (
        <div>
            <PaginatedContainer
                title="Friends"
                items={friends}
                perPage={5}
                render={({ items }) =>
                    items.map(ev => (
                        <UserCard key={ev.username} username={ev.username} showControlls>
                            <Button clicked={() => removeFromFriendsList(ev.username)} classes="btn-orangeGradient btn-sm">
                                <i className="fas fa-user-minus" />
                            </Button>
                        </UserCard>
                    ))
                }
            />
            <PaginatedContainer
                title="Friend Requests"
                items={friendsRequests}
                perPage={5}
                render={({ items }) =>
                    items.map(ev => (
                        <UserCard key={ev.username} username={ev.username} showControlls>
                            <Button clicked={() => ignoreRequestFriendsList(ev.username)} classes="btn-orangeGradient btn-sm">
                                <i className="fas fa-user-times" />
                            </Button>
                            <Button clicked={() => acceptFriendsList(ev.username)} classes="btn-blueGradient btn-sm">
                                <i className="fas fa-user-plus" />
                            </Button>
                        </UserCard>
                    ))
                }
            />
        </div>)
}

export default FriendsList;