import React, { useState, useEffect } from "react";
import PaginatedContainer from "../../../components/PaginatedContainer";
import UserCard from "../../../components/UserCard";
import { Button } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import { userService } from "../../../Authentication/service";

// import { friends, friendsRequests } from "../../../mockData";

const FriendsList = () => {
    const [friendList, setFriendList] = useState({ friends: [], spinner: true })
    const [friendRequests, setFriendRequests] = useState({ requests: [], spinner: true })

    useEffect(() => {
        let __isMounted = true;
        userService.getFriendsList()
            .then(res => {
                console.log(res);
                if (__isMounted) {
                    setFriendList({ friends: res, spinner: false });
                }
            });
        userService.getFriendRequestList()
            .then(res => {
                if (__isMounted) {
                    setFriendRequests({ requests: res, spinner: false });
                }
            }).catch(err => {
                if (__isMounted) {
                    console.log(err);
                    setFriendRequests({ requests: [], spinner: false });
                }
            });

        return () => {
            __isMounted = false;
        };
    }, []);

    const removeFromFriendsList = (userID) => {
        userService.removeFromFriends(userID)
            .then(_ => {
                setFriendList({ friends: friendList.friends.filter(user => user.id !== userID), spinner: false });
            })
            .catch(_ => {
                setFriendList({ ...friendList, spinner: false });
            });
    }
    const ignoreRequestFriendsList = (invitationId) => {
        userService.rejectInvite(invitationId)
            .then(res => {
                setFriendRequests({ requests: friendRequests.requests.filter(invitation => invitation.invitor.id !== res.invitor.id), spinner: false });
            })
            .catch(_ => {
                setFriendRequests({ ...friendRequests, spinner: false })
            });
    }
    const acceptFriendsList = (invitationId) => {
        userService.acceptInvite(invitationId)
            .then(res => {
                const tempFriedsList = friendList.friends;
                const acceptFriendsInvitation = friendRequests.requests.filter(invitation => invitation.invitor.id === res.relatedUserId)[0];
                tempFriedsList.push(acceptFriendsInvitation.invitor);
                setFriendRequests({ requests: friendRequests.requests.filter(invitation => invitation.invitor.id !== res.relatedUserId), spinner: false });
                setFriendList({ friends: tempFriedsList, spinner: false });
            })
            .catch(_ => {
                setFriendList({ ...FriendsList, spinner: false });
            });

    }

    return (
        <div>
            <PaginatedContainer
                title="Friends"
                items={friendList.friends}
                perPage={5}
                noContentMsg="empty friends list"
                render={
                    friendList.spinner
                        ? () => <Spinner />
                        : ({ items }) =>
                            items.map(ev => (
                                <UserCard key={ev.username} username={ev.username} imageUrl={ev.picUrl} showControlls>
                                    <Button clicked={() => removeFromFriendsList(ev.id)} classes="btn-orangeGradient-icon btn-sm">
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
                noContentMsg="no new requests"
                render={
                    friendRequests.spinner
                        ? () => <Spinner />
                        : ({ items }) =>
                            items.map(ev => (
                                <UserCard key={ev.invitor.id} username={ev.invitor.username} imageUrl={ev.invitor.picUrl} showControlls>
                                    <Button clicked={() => ignoreRequestFriendsList(ev.id)} classes="btn-orangeGradient-icon btn-sm">
                                        <i className="fas fa-user-times" />
                                    </Button>
                                    <Button clicked={() => acceptFriendsList(ev.id)} classes="btn-blueGradient-icon btn-sm">
                                        <i className="fas fa-user-plus" />
                                    </Button>
                                </UserCard>
                            ))
                }
            />
        </div>)
}

export default FriendsList;