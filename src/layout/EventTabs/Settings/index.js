import React, { useState, useEffect, useContext } from "react";
import { FormContext } from "../../../context/FormContext";
import { UserContext } from "../../../context/UserContext";

import { history } from "../../../Authentication/helper";
import { OptionsInput, TextInput } from "../../../components/Inputs";
import { Button, EditButton } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import UserCard from "../../../components/UserCard";
import PaginatedContainer from "../../../components/PaginatedContainer";
import LeaveEventContainer from "./LeaveEventContainer";

import { eventService } from "../../../Authentication/service";

import { requestsFoThisEvent } from "../../../mockData";

import "./settings.scss";

const Settings = ({ eventId }) => {

    const [, setform] = useContext(FormContext);
    const [loggedInUser,] = useContext(UserContext);
    const [isAuthorized, setAuthorization] = useState(false);

    const [editState, setEdit] = useState(false);

    const [members, setMembers] = useState({ users: [], spinner: true })

    const [eventInfo, setEventInfo] = useState({ event: {}, spinner: true });

    const [admins, setAdmins] = useState({ users: [], spinner: true })

    const [settings, setSettings] = useState({
        privacy: { value: "private", spinner: false },
        currency: { value: "private", spinner: false }
    })

    useEffect(() => {
        let __isMounted = true;

        eventService.getEventByID(eventId)
            .then(res => {
                console.log(res);
                setEventInfo({ ...eventInfo, event: res });
            }, err => {
                console.log(err);
            })

        eventService.isCurrentUserAdminOfEvent(eventId)
            .then(res => {
                setAuthorization(isAuthorized || res || loggedInUser.isAdmin);
                console.log(`ev: ${res}`);
            }, err => {
                console.log(err);
            })


        Promise.all([eventService.getEventMembers(eventId), eventService.getAllEventAdmins(eventId)])
            .then(res => {
                if (__isMounted) {
                    console.log(res[0]);
                    console.log(res[1]);
                    setMembers({
                        users: res[0].filter(user => {
                            return res[1].filter(admin => admin.id === user.id).length <= 0;
                        }), spinner: false
                    });
                    setAdmins({ users: res[1], spinner: false });
                }
            })


        return () => {
            __isMounted = false;
        };
    }, [eventId]);

    const editHandler = () => {
        setEdit(!editState);
    };

    const onChangeHandler = (event) => {
        setSettings({
            ...settings, [`${event.target.name}`]: event.target.value,
        })
    }

    const confirmEventDeletion = () => {
        eventService.deleteEvent(eventId)
            .then(res => {
                console.log(res);
                history.push("/");
            })
            .catch(err => {
                console.log(err);
                editHandler();
            })
    }



    const promoteToAdmin = (userId) => {
        eventService.promoteToEventAdmin(eventId, userId)
            .then(res => {
                console.log(res);
                const tempAdminsList = admins.users;
                const foundUser = members.users.filter(user => user.id === userId)[0];
                tempAdminsList.push(foundUser);
                setMembers({ users: members.users.filter(user => user.id !== userId), spinner: false });
                setAdmins({ users: tempAdminsList, spinner: false });
            }, err => {
                console.log(err);
            })
    }

    const saveCurrencyChanges = () => {
        setSettings({ ...settings, currency: { ...settings.currency, spinner: true } })
        setTimeout(() => {
            console.log(`currency changed to ${settings.currency.value} on event: ${eventId}`)
            setSettings({ ...settings, currency: { ...settings.currency, spinner: false }, privacy: { ...settings.privacy, spinner: false } })
        }, 2000);
    }
    const savePrivacyChanges = () => {
        setSettings({ ...settings, privacy: { ...settings.privacy, spinner: true } })
        setTimeout(() => {
            console.log(`privacy changed to ${settings.privacy.value} on event: ${eventId}`)
            setSettings({ ...settings, privacy: { ...settings.privacy, spinner: false }, currency: { ...settings.currency, spinner: false } })
        }, 2000);
    }

    var currencyCodes = [
        "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM",
        "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD",
        "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP",
        "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP",
        "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP",
        "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS",
        "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF",
        "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL",
        "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR",
        "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR",
        "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON",
        "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL",
        "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP",
        "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYI", "UYU",
        "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC",
        "XBD", "XCD", "XDR", "XFU", "XOF", "XPD", "XPF", "XPT", "XTS", "XXX", "YER",
        "ZAR", "ZMW"];

    const openModalToLeaveEvent = () => {
        setform({ show: true, renderForm: <LeaveEventContainer eventId={eventId} /> });
    };


    return (
        <div className="settings-container">
            <div className="leave-btn-container">
                <Button clicked={openModalToLeaveEvent} classes="btn-orangeGradient btn-md">
                    Leave Event
                </Button>
            </div>
            {isAuthorized &&
                <>
                    {/* <div className="name-box">
                        <TextInput
                            onChange={onChangeHandler}
                            placeholder={el.config.placeholder}
                            name="name"
                            value={eventInfo.event.name}
                            size="input-sm"
                            classes={isEditable ? "input-blue" : ""}
                            error={editableUserInfo[el.name].err[0]}
                        />
                    </div> */}
                    <div className="privacy-box">
                        <div className="header-button">
                            <h2>Privacy</h2>
                            {settings.privacy.spinner
                                ? <Spinner />
                                : <Button clicked={savePrivacyChanges} classes="btn-blueGradient btn-sm">Save changes</Button>
                            }

                        </div>
                        <OptionsInput onChange={onChangeHandler} value={eventInfo.event.eventType} name="privacy" options={["PRIVATE", "PUBLIC", "NORMAL", "SECRET"]} />

                    </div>
                    <div className="currency-box">
                        <div className="header-button">
                            <h2>Currency</h2>
                            {settings.currency.spinner
                                ? <Spinner />
                                : <Button clicked={saveCurrencyChanges} classes="btn-blueGradient btn-sm">Save changes</Button>
                            }
                        </div>
                        <OptionsInput onChange={onChangeHandler} value={settings.currency.value} name="currency" options={currencyCodes} />

                    </div>
                    <div className="delete-box">
                        <h2>Delete Event</h2>
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
                        <h2>Event Admins</h2>
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

                        <h2>Event Members</h2>
                        <PaginatedContainer
                            title=""
                            items={members.users}
                            perPage={5}
                            render={
                                members.spinner
                                    ? () => <Spinner />
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

export default Settings;