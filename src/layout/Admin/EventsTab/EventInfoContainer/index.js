import React, {useState, useEffect, useContext} from 'react'
import { eventService } from "../../../../Authentication/service";
import Spinner from "../../../../components/Spinner";
import { Button, EditButton } from "../../../../components/Button";
import PaginatedContainer from "../../../../components/PaginatedContainer";

import {FormContext} from "../../../../context/FormContext";
import {FlashMessageContext} from "../../../../context/FlashMessageContext";

import "./EventInfoContainer.scss";

const EventInfoContainer = ({eventId}) => {

const [,setForm] = useContext(FormContext);
const [,setFlashMessage] = useContext(FlashMessageContext);

    const [eventInfo, setEventInfo] = useState({
        name: "Loading...",
        eventType: "Loading...",
        over: false,
        startTime: "Loading..."
    });

    const [eventMembers, setEventMembers] = useState({users: [], spinner: true});
    const [eventAdmins, setEventAdmins] = useState({users: [], spinner: true});
    const [deleteState, setDeleteState] = useState(false);

    useEffect(() => {
        eventService.getEventByID(eventId)
        .then(res => {
            console.log(res);
            setEventInfo({
                name: res.name,
                eventType: res.eventType,
                over: res.over,
                startTime: res.startTime
            });
        }, err => {
            console.log(err);
        })
        Promise.all([eventService.getEventMembers(eventId), eventService.getAllEventAdmins(eventId)])
        .then(res =>{
            const filterMembersList = res[0].filter( memeber => res[1].findIndex( user => user.id === memeber.id) < 0);
            setEventMembers({users: filterMembersList, spinner: false});
            setEventAdmins({users: res[1], spinner: false});
        }, err => {
            console.log(err);
        });

        return () => {
            
        }
    }, [])

    const toggleDeleteState = () =>{
        setDeleteState(!deleteState);
    }

    const confirmDleteEvent = () =>{
        console.log(`deleting event ${eventId}`);
        setForm({renderForm: "", show: false});
        setFlashMessage({  
            message: `successfuly deleted event id: ${eventId}`,
            show: true,
            messageState: "success"
        })
    }

    const kickUser = (userId) =>{
        console.log(`kicking user ${userId} from event ${eventId}`);
        setEventMembers({users: eventMembers.users.filter( user => user.id !== userId), spinner: false});
        setEventAdmins({users: eventAdmins.users.filter( user => user.id !== userId), spinner: false});
    }

    const promoteUserToAdmin = (userId) =>{
        const foundUser = eventMembers.users.findIndex(user => user.id === userId);
        const tempAdminList = eventAdmins.users;
        tempAdminList.push(eventMembers.users[foundUser]);
        setEventAdmins({users: tempAdminList, spinner: false});
        setEventMembers({users: eventMembers.users.filter( (user) => user.id !== userId), spinner: false});
    }

    const demoteUserFromAdmin = (userId) =>{
        const foundUser = eventAdmins.users.findIndex(user => user.id === userId);
        const tempMemebrsList = eventMembers.users;
        tempMemebrsList.push(eventAdmins.users[foundUser]);
        setEventMembers({users: tempMemebrsList, spinner: false});
        setEventAdmins({users: eventMembers.users.filter((user) => user.id !== userId), spinner: false});
    }

    return (
        <div className="event-info-container-box">
            <div className="event-quick-info">
                <span>name:</span>
                <p>{eventInfo.name}</p>
                <span>event type:</span>
                <p>{eventInfo.eventType}</p>
                <span>state:</span>
                <p>{eventInfo.over ? "finished" : "ongoing"}</p>
                <span>start date:</span>
                <p>{eventInfo.startTime.substring(0,10)}</p>
                <EditButton
                    options={deleteState}
                    activate={toggleDeleteState}
                    cancel={toggleDeleteState}
                    confirm={confirmDleteEvent}
                    classes="delete"
                    tags
                    render={<><i className="fas fa-trash-alt" />delete</>} 
                    />
            </div>
            <div className="event-admin-list">
                <PaginatedContainer
                title="admins"
                perPage={5}
                items={eventAdmins.users}
                render={
                    eventAdmins.spinner
                    ? () => <Spinner />
                    : ({ items }) =>
                    items.map(ev => (
                        <div key={ev.username} className="user-card">
                            <span className="username">{ev.username}</span>
                            <Button clicked={() => demoteUserFromAdmin(ev.id)} classes="admin active"><i className="fas fa-star"/></Button>
                            <Button clicked={ () => kickUser(ev.id)} classes="kick"><i className="fas fa-times"/></Button>
                        </div>
                ))} />
            </div>
            <div className="event-memeber-list">
                <PaginatedContainer
                title="members"
                perPage={10}
                items={eventMembers.users}
                render={
                    eventMembers.spinner
                    ? () => <Spinner />
                    : ({ items }) =>
                    items.map(ev => (
                        <div key={ev.username} className="user-card">
                            <span className="username">{ev.username}</span>
                            <Button clicked={() => promoteUserToAdmin(ev.id)} classes="admin" ><i className="fas fa-star"/></Button>
                            <Button clicked={ () => kickUser(ev.id)} classes="kick" ><i className="fas fa-times"/></Button>
                        </div>
                ))} />
            </div>
        </div>
    )
}


export default EventInfoContainer;