import React, { useState, useEffect, useContext } from "react";
// import { events } from "../../../mockData";
import {FormContext} from "../../../context/FormContext";

import { SearchBar, TextInput } from "../../../components/Inputs";
import EventInfoCard from "./EventInfoCard";
import PaginatedContainer from "../../../components/PaginatedContainer";
import Spinner from "../../../components/Spinner";
import {Button} from "../../../components/Button";
import EventInfoContainer from "./EventInfoContainer";
import "./EventTab.scss";

import { eventService } from "../../../Authentication/service";

const EventLayout = () => {
  const [, setForms] = useContext(FormContext);
  const [allEventsList, setAllEventsList] = useState({ events: [], spinner: true });
  const [dislpayEvent, setDisplayEvent] = useState({ events: [], spinner: true });

  const [searchFilter, setSearchFilter] = useState({ startDate: "", endDate: "", name: "" });

  useEffect(() => {
    let __isMounted = true;
    eventService.getAllEvents()
      .then(res => {
        if (__isMounted) {
          setAllEventsList({ events: res, spinner: false });
          setDisplayEvent({ events: res, spinner: false });
        }
      }, _err =>{
        setAllEventsList({ events: [], spinner: false });
        setDisplayEvent({ events: [], spinner: false });
      });

    return () => {
      __isMounted = false;
    };
  }, []);


  const handleSearch = event => {
    setSearchFilter({
      ...searchFilter,
      [`${event.target.name}`]: event.target.value
    });
  };

  const clearFilters = () =>{
    setDisplayEvent({ ...allEventsList});
    setSearchFilter({startDate: "", endDate: "", name: "" });
  }

  const searchingEventsWithFilter = () => {

    let filteredEvents = [...allEventsList.events];
    if (searchFilter.name.length > 0) {
      filteredEvents = filteredEvents.filter((ev) => {
        let searchValue = ev.name;
        return searchValue.indexOf(searchFilter.name) !== -1;
      });
    }
    if (searchFilter.startDate.length > 0) {
      filteredEvents = filteredEvents.filter((ev) => {
        let searchValue = ev.startTime.substring(0, 10);
        return Date.parse(searchValue) >= Date.parse(searchFilter.startDate);
      });
    }
    if (searchFilter.endDate.length > 0) {
      filteredEvents = filteredEvents.filter((ev) => {
        let searchValue = ev.startTime.substring(0, 10);
        return Date.parse(searchValue) <= Date.parse(searchFilter.endDate);
      });
    }
    setDisplayEvent({...dislpayEvent, events: filteredEvents});

  }

  const openEventInfoCard = (eventId) =>{
    setForms({renderForm: <EventInfoContainer eventId={eventId} />, show: true});
  }
  return (
    <div className="all-user-container">
      <div className="search-filters">
        <TextInput
          onChange={handleSearch}
          placeholder="from"
          type="date"
          name="startDate"
          value={searchFilter.startDate}
          classes="input-blue text-input-extra date"
        />
        <TextInput
          onChange={handleSearch}
          placeholder="to"
          type="date"
          name="endDate"
          value={searchFilter.endDate}
          classes="input-blue text-input-extra date"
        />
        <SearchBar
          onChange={handleSearch}
          placeholder="name"
          name="name"
          value={searchFilter.name}
          clicked={searchingEventsWithFilter}
        />
      <Button clicked={clearFilters} classes="btn-sm btn-blueGradient search-submit-btn">clear filters</Button>
      </div>
      <PaginatedContainer
        title="All Events"
        perPage={10}
        items={dislpayEvent.events}
        render={
          dislpayEvent.spinner
            ? () => <Spinner />
            : ({ items }) =>
              items.map(ev => (
                <EventInfoCard
                  clicked={() => openEventInfoCard(ev.id)}
                  key={ev.id}
                  eventName={ev.name}
                  date={ev.startTime.substring(0,10)}
                  country={ev.address.country}
                  eventState={ev.isComplete}
                />
              ))} />

    </div>
  );
};

export default EventLayout;
