import React, { useState, useEffect } from "react";
import PaginatedContainer from "../../../components/PaginatedContainer";
import UserCard from "../../../components/UserCard";
import { Button } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import { friends, friendsRequests } from "../../../mockData";

const FriendsList = () => {
    let __isMounted = false
    const [friendList, setFriendList] = useState({ friends: [], spinner: true })
    const [friendRequests, setFriendRequests] = useState({ requests: [], spinner: true })

    useEffect(() => {
        __isMounted = true;
        setTimeout(() => {
            if (__isMounted) {
                setFriendList({ friends: friends, spinner: false });
                setFriendRequests({ requests: friendsRequests, spinner: false });
            }
        }, 1000);
        return () => {
            __isMounted = false;
        };
    }, []);

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
                items={friendList.friends}
                perPage={5}
                render={
                    friendList.spinner
                        ? () => <Spinner />
                        : ({ items }) =>
                            items.map(ev => (
                                <UserCard key={ev.username} username={ev.username} imageUrl={ev.avatarUrl} showControlls>
                                    <Button clicked={() => removeFromFriendsList(ev.username)} classes="btn-orangeGradient btn-sm">
                                        <i className="fas fa-user-minus" />
                                    </Button>
                                </UserCard>
                            ))
                }
            />
            <PaginatedContainer
                title="Friend Requests"
                items={friendRequests.requests}
                perPage={5}
                render={
                    friendRequests.spinner
                        ? () => <Spinner />
                        : ({ items }) =>
                            items.map(ev => (
                                <UserCard key={ev.username} username={ev.username} imageUrl={ev.avatarUrl} showControlls>
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