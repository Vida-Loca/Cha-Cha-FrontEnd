import React, { useState, useEffect } from "react";
// import { events } from "../../../mockData";

import { SearchBar, TextInput } from "../../../components/Inputs";
import EventCard from "../../../components/EventCard";
import PaginatedContainer from "../../../components/PaginatedContainer";
import Spinner from "../../../components/Spinner";
import "./EventTab.scss";

import { eventService } from "../../../Authentication/service";

const EventLayout = () => {

  const [publicEventsList, setPublicEventsList] = useState({ events: [], spinner: true });

  const [searchFilter, setSearchFilter] = useState({ startDate: "", endDate: "", name: "" });

  useEffect(() => {
    let __isMounted = true;
    eventService.getAllEvents()
      .then(res => {
        if (__isMounted) {
          setPublicEventsList({ events: res, spinner: false });
        }
      })
      .catch(err => {
        console.log(err);
      })

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

  const searchingEventsWithFilter = () => {

    let filteredEvents = [...publicEventsList.events];
    if (searchFilter.name.length > 0) {
      console.log("searching by name...");
      filteredEvents = filteredEvents.filter((ev) => {
        let searchValue = ev.name;
        return searchValue.indexOf(searchFilter.name) !== -1;
      });
    }
    if (searchFilter.startDate.length > 0) {
      console.log("searching by star Date...");
      filteredEvents = filteredEvents.filter((ev) => {
        let searchValue = ev.startTime.substring(0, 10);
        return Date.parse(searchValue) >= Date.parse(searchFilter.startDate);
      });
    }
    if (searchFilter.endDate.length > 0) {
      console.log("searching by endDate ...");
      filteredEvents = filteredEvents.filter((ev) => {
        let searchValue = ev.startTime.substring(0, 10);
        return Date.parse(searchValue) <= Date.parse(searchFilter.endDate);
      });
    }
    console.log(filteredEvents);

  }
  return (
    <div className="all-user-container">
      <div className="search-filters">
        <TextInput
          onChange={handleSearch}
          placeholder="start date"
          type="date"
          name="startDate"
          value={searchFilter.startDate}
          classes="input-blue text-input-extra date"
        />
        <TextInput
          onChange={handleSearch}
          placeholder="end date"
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

      </div>
      <PaginatedContainer
        title="All Events"
        perPage={10}
        items={publicEventsList.events}
        render={
          publicEventsList.spinner
            ? () => <Spinner />
            : ({ items }) =>
              items.map((ev, index) => (
                <EventCard
                  id={ev.id}
                  key={ev.id}
                  name={ev.name}
                  date={ev.startTime}
                  location={ev.address}
                  eventState={ev.isComplete}
                  listIndex={index % 10}
                />
              ))} />

    </div>
  );
};

export default EventLayout;
