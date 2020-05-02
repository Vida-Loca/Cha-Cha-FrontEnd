import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../../../context/FormContext";

import { history } from "../../../Authentication/helper";
import { OptionsInput, TextInput } from "../../../components/Inputs";
import { Button, EditButton } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import UserCard from "../../../components/UserCard";
import PaginatedContainer from "../../../components/PaginatedContainer";
import LeaveEventContainer from "./LeaveEventContainer";
import EndEventContainer from "./EndEventContainer";

import {currencyCodes} from "./currencyList";

import { eventService } from "../../../Authentication/service";

// import { requestsFoThisEvent } from "../../../mockData";

import "./settings.scss";

const Settings = ({ eventId, isEventAdmin }) => {

    const [, setform] = useContext(FormContext);

    const [editState, setEdit] = useState(false);

    const [members, setMembers] = useState({ users: [], spinner: true })
    const [admins, setAdmins] = useState({ users: [], spinner: true })
    const [nameErr, setNameErr] = useState("");

    const [eventInfo, setEventInfo] = useState(
        { 
            event: {
            name: "Loading...",
            currency: "Loading...",
            eventType: "Loading..."
        }, 
        spinner: true,
        fullEvent: {} }
        );


    useEffect(() => {
        let __isMounted = true;

        eventService.getEventByID(eventId)
            .then(res => {
                console.log(res);
                if(__isMounted){
                    setEventInfo({ 
                        event: {
                        name: res.name,
                        currency: res.currency,
                        eventType: res.eventType
                    },
                         spinner: false,
                         fullEvent: res
                        });
                }
            }, err => {
                console.log(err);
                setEventInfo({ ...eventInfo,  spinner: false,});
            })

        // only fetch data if it's needed, normal user ( without Admin priviliges ) is not going to see admin & members list
        if(isEventAdmin){
            Promise.all([eventService.getEventMembers(eventId), eventService.getAllEventAdmins(eventId)])
            .then(res => {
                if (__isMounted) {
                    setMembers({
                        users: res[0].filter(user => {
                            return res[1].filter(admin => admin.id === user.id).length <= 0;
                        }), spinner: false
                    });
                    setAdmins({ users: res[1], spinner: false });
                }
            })
        }

        return () => {
            __isMounted = false;
        };
    }, [eventId]);

    const editHandler = () => {
        setEdit(!editState);
    };

    const onChangeHandler = (event) => {
        setEventInfo({
            ...eventInfo, event: { ...eventInfo.event, [`${event.target.name}`]: event.target.value},
        })
    }


    const confirmEventDeletion = () => {
        eventService.deleteEvent(eventId)
            .then(res => {
                history.push("/");
            })
            .catch(err => {
                console.log(err);
                editHandler();
            })
    }

    const endEventOpenModal = () =>{
        setform({ show: true, renderForm: <EndEventContainer eventId={eventId} currentEvent={eventInfo.fullEvent} /> });
    }



    const promoteToAdmin = (userId) => {
        eventService.promoteToEventAdmin(eventId, userId)
            .then(res => {
                const tempAdminsList = admins.users;
                const foundUser = members.users.filter(user => user.id === userId)[0];
                tempAdminsList.push(foundUser);
                setMembers({ users: members.users.filter(user => user.id !== userId), spinner: false });
                setAdmins({ users: tempAdminsList, spinner: false });
            }, err => {
                console.log(err);
            })
    }

    const saveChanges = () => {
        if(eventInfo.event.name.length > 0){
            setEventInfo({...eventInfo, spinner: true});
            const updatedEvent = {
                ...eventInfo.fullEvent,
                startTime: eventInfo.fullEvent.startTime.replace(" ", "T"),
                name: eventInfo.event.name,
                currency: eventInfo.event.currency,
                eventType: eventInfo.event.eventType,
            }
            eventService.updateEvent(eventId, updatedEvent).then(res =>{
                setEventInfo({...eventInfo, spinner: false});
            }, err =>{
                console.log(err);
                setEventInfo({ ...eventInfo,  spinner: false,});
            })
        } else{
            setNameErr("is required");
        }
       

    }

    const openModalToLeaveEvent = () => {
        setform({ show: true, renderForm: <LeaveEventContainer eventId={eventId} /> });
    };

    return (
        <div className="settings-container">
            <div className="settings-btn-container">
                <Button clicked={openModalToLeaveEvent} classes="btn-orangeGradient btn-md">
                <i className="fas fa-sign-out-alt" /> Leave Event
                </Button>
                {isEventAdmin && !eventInfo.fullEvent.over &&
                <Button clicked={endEventOpenModal} classes="btn-blueGradient btn-md">
                    <i className="fas fa-check-square" /> end event
                </Button>}
            </div>
            
            {isEventAdmin &&
                <>
                    <div className="name-box">
                    <h3>Event Name</h3>
                        <TextInput
                            onChange={onChangeHandler}
                            placeholder=""
                            name="name"
                            value={eventInfo.event.name}
                            size="input-md"
                            classes="input-blue"
                            error={nameErr}
                        />
                    </div>
                    <div className="privacy-box">
                        <h3>Privacy</h3>
                        <OptionsInput classes="input-md option-md option-blue" onChange={onChangeHandler} value={eventInfo.event.eventType} name="eventType" options={["PRIVATE", "PUBLIC", "NORMAL", "SECRET"]} />
                    </div>
                    <div className="currency-box">
                        <h3>Currency</h3>
                        <OptionsInput classes="input-md option-md option-blue" onChange={onChangeHandler} value={eventInfo.event.currency} name="currency" options={currencyCodes} />
                    </div>
                    <div className="save-btn">
                    {eventInfo.spinner
                                ? <Spinner classes="spinner-container-h-sm" size="spinner-sm" />
                                : <Button clicked={saveChanges} classes="btn-blueGradient btn-sm">Save changes</Button>
                            }
                    </div>
                    <div className="delete-box">
                        <h3>Delete Event</h3>
                        <EditButton
                            options={editState}
                            activate={editHandler}
                            cancel={editHandler}
                            confirm={confirmEventDeletion}
                            tags
                            render={
                                <><i className="far fa-trash-alt" />Delete</>} />
                    </div>
                    <div className="admin-members-box">
                        <h3>Event Admins</h3>
                        <PaginatedContainer
                            title=""
                            items={admins.users}
                            perPage={5}
                            render={
                                admins.spinner
                                    ? () => <Spinner />
                                    : ({ items }) =>
                                        items.map(ev => (
                                            <UserCard key={ev.username} username={ev.username} showControlls={true}>
                                            </UserCard>
                                        ))} />

                        <h3>Event Members</h3>
                        <PaginatedContainer
                            title=""
                            items={members.users}
                            perPage={5}
                            render={
                                members.spinner
                                    ? () => <Spinner/>
                                    : ({ items }) =>
                                        items.map(ev => (
                                            <UserCard key={ev.username} username={ev.username} showControlls={true}>
                                                <Button clicked={() => promoteToAdmin(ev.id)} classes="btn-secondary-orange btn-sm">promote</Button>
                                            </UserCard>
                                        ))} />
                    </div>
                </>
            }


        </div>)
}

Settings.propTypes = {
    eventId: PropTypes.string.isRequired,
    isEventAdmin: PropTypes.bool.isRequired
  };

export default Settings;