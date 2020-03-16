import React, { useState, useEffect } from "react";
import { OptionsInput } from "../../../components/Inputs";
import { Button, EditButton } from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import UserCard from "../../../components/UserCard";
import PaginatedContainer from "../../../components/PaginatedContainer";

import { membersOfTheEvent, requestsFoThisEvent } from "../../../mockData";

import "./settings.scss";

const Settings = ({ id }) => {
    let __isMounted = false

    const [editState, setEdit] = useState(false);

    const [settings, setSettings] = useState({
        privacy: "private",
        admins: { users: [], spinner: true },
        users: { users: [], spinner: true },
        currency: ""
    })

    useEffect(() => {
        __isMounted = true;

        setTimeout(() => {
            if (__isMounted) {
                setSettings({
                    privacy: "private",
                    admins: { users: membersOfTheEvent, spinner: false },
                    users: { users: requestsFoThisEvent, spinner: false },
                    currency: "PLN"
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

    const confirmEventDeletion = () => {
        setTimeout(() => {
            console.log("deleting")
            editHandler();
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
    // var currencyCodes = [
    //     { country: "United States dollar", abrev: "USD" }, { country: "	European euro", abrev: "EUR" }, { country: "Australian dollar", abrev: "AUD" },
    //     { country: "Armenian dram", abrev: "AMD" }, { country: "Belarusian ruble", abrev: "BYN" }, { country: "Canadian dollar", abrev: "CAD" },
    //     { country: "Brazilian real", abrev: "BRL" }, { country: "Bulgarian lev", abrev: "BGN" }, { country: "Chinese Yuan Renminbi", abrev: "CNY" },
    //     { country: "Czech koruna", abrev: "CZK" }, { country: "Danish krone", abrev: "DKK" }, { country: "Egyptian pound", abrev: "EGP" },
    //     { country: "Georgian lari", abrev: "GEL" }, { country: "Indian rupee", abrev: "INR" }, { country: "Iranian rial", abrev: "IRR" },
    //     { country: "Israeli new shekel", abrev: "ILS" }, { country: "Kazakhstani tenge", abrev: "KZT" }, { country: "Nigerian naira", abrev: "NGN" },
    //     { country: "Japanese yen", abrev: "JPY" }, { country: "North Korean won", abrev: "KPW" }, { country: "Norwegian krone", abrev: "NOK" },
    //     { country: "Polish zloty", abrev: "PLN" }, { country: "Russian ruble", abrev: "RUB" }, { country: "Romanian leu", abrev: "RON" },
    //     { country: "Serbian dinar", abrev: "RSD" }, { country: "South Korean won", abrev: "KRW" }, { country: "Swiss franc", abrev: "CHF" },
    //     { country: "Swedish krona", abrev: "SEK" }, { country: "Swedish krona", abrev: "UGX" }, { country: "Ukrainian hryvnia", abrev: "UAH" },
    //     { country: "Pound sterling", abrev: "GBP" }, { country: "Venezuela", abrev: "VES" }, { country: "Uzbekistani som", abrev: "UZS" }];

    return (
        <div className="settings-container">

            <div className="setting-box">
                <div className="header-button">
                    <h2>Privacy</h2>
                    <Button classes="btn-blueGradient btn-sm">Save changes</Button>
                </div>
                <OptionsInput onChange={onChangeHandler} value={settings.privacy} name="privacy" options={["private", "public", "friends"]} />

            </div>
            <div className="setting-box">
                <div className="header-button">
                    <h2>Currency</h2>
                    <Button classes="btn-blueGradient btn-sm">Save changes</Button>
                </div>
                <OptionsInput onChange={onChangeHandler} value={settings.currency} name="currency" options={currencyCodes} />

            </div>
            <div className="setting-box">
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
            <div className="setting-box">
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
                                        <Button clicked={() => demoteAdmin(ev.username)} classes="btn-orangeGradient btn-sm">demote</Button>
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
                                        <Button clicked={() => promoteToAdmin(ev.username)} classes="btn-blueGradient btn-sm">promote</Button>
                                    </UserCard>
                                ))} />
            </div>

        </div>)
}

export default Settings;