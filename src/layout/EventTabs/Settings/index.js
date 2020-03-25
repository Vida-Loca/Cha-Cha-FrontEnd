import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { OptionsInput } from "../../../components/Inputs";
import { Button, EditButton } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import UserCard from "../../../components/UserCard";
import PaginatedContainer from "../../../components/PaginatedContainer";

import { membersOfTheEvent, requestsFoThisEvent } from "../../../mockData";

import "./settings.scss";

const Settings = ({ id }) => {
    const [editState, setEdit] = useState(false);

    const [deleted, setDeleted] = useState(false);

    const [settings, setSettings] = useState({
        privacy: { value: "private", spinner: false },
        currency: { value: "private", spinner: false },
        admins: { users: [], spinner: true },
        users: { users: [], spinner: true }
    })

    useEffect(() => {
        let __isMounted = true;

        setTimeout(() => {
            if (__isMounted) {
                setSettings({
                    privacy: { value: "private", spinner: false },
                    admins: { users: membersOfTheEvent, spinner: false },
                    users: { users: requestsFoThisEvent, spinner: false },
                    currency: { value: "PLN", spinner: false }
                });
            }

        }, 1000);
        return () => {
            __isMounted = false;
        };
    }, []);

    const editHandler = () => {
        setEdit(!editState);
    };


    const onChangeHandler = (event) => {
        setSettings({
            ...settings, [`${event.target.name}`]: event.target.value,
        })
    }

    const confirmEventDeletion = ({ history }) => {
        setTimeout(() => {
            console.log("deleting")
            editHandler();
            setDeleted(true);
        }, 2000);
    }

    const promoteToAdmin = (username) => {
        setTimeout(() => {
            console.log(`promoting ${username} to admin on event ${id}`)
        }, 2000);
    }
    const demoteAdmin = (username) => {
        setTimeout(() => {
            console.log(`demoting ${username} from admin on event ${id}`)
        }, 2000);
    }

    const saveCurrencyChanges = () => {
        setSettings({ ...settings, currency: { ...settings.currency, spinner: true } })
        setTimeout(() => {
            console.log(`currency changed to ${settings.currency.value} on event: ${id}`)
            setSettings({ ...settings, currency: { ...settings.currency, spinner: false }, privacy: { ...settings.privacy, spinner: false } })
        }, 2000);
    }
    const savePrivacyChanges = () => {
        setSettings({ ...settings, privacy: { ...settings.privacy, spinner: true } })
        setTimeout(() => {
            console.log(`privacy changed to ${settings.privacy.value} on event: ${id}`)
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

    return (
        <div className="settings-container">
            {deleted && <Redirect to="/" push={true} />}
            <div className="privacy-box">
                <div className="header-button">
                    <h2>Privacy</h2>
                    {settings.privacy.spinner
                        ? <Spinner />
                        : <Button clicked={savePrivacyChanges} classes="btn-blueGradient btn-sm">Save changes</Button>
                    }

                </div>
                <OptionsInput onChange={onChangeHandler} value={settings.privacy.value} name="privacy" options={["private", "public", "friends"]} />

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
                    items={settings.admins.users}
                    perPage={5}
                    render={
                        settings.admins.spinner
                            ? () => <Spinner />
                            : ({ items }) =>
                                items.map(ev => (
                                    <UserCard key={ev.username} username={ev.username} showControlls={true}>
                                        <Button clicked={() => demoteAdmin(ev.username)} classes="btn-secondary-orange-active btn-sm">demote</Button>
                                    </UserCard>
                                ))} />

                <h2>Event Members</h2>
                <PaginatedContainer
                    title=""
                    items={settings.users.users}
                    perPage={5}
                    render={
                        settings.users.spinner
                            ? () => <Spinner />
                            : ({ items }) =>
                                items.map(ev => (
                                    <UserCard key={ev.username} username={ev.username} showControlls={true}>
                                        <Button clicked={() => promoteToAdmin(ev.username)} classes="btn-secondary-orange btn-sm">promote</Button>
                                    </UserCard>
                                ))} />
            </div>

        </div>)
}

export default Settings;