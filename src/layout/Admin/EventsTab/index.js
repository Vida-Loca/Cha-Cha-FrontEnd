import React, { useState, useEffect } from "react";
import { events } from "../../../mockData";

import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/Inputs";
import EventCard from "../../../components/EventCard";
import PaginatedContainer from "../../../components/PaginatedContainer";
import Spinner from "../../../components/Spinner";
import "./EventTab.scss";

const EventLayout = () => {
  let __isMounted = false

  const [publicEventsList, setPublicEventsList] = useState({ events: [], spinner: true });

  const [searchFilter, setSearchFilter] = useState({ startDate: "", endDate: "", name: "" });

  useEffect(() => {
    __isMounted = true;
    setTimeout(() => {
      if (__isMounted) {
        setPublicEventsList({ events: events, spinner: false });
      }
    }, 1000);
    return () => {
      __isMounted = false;
    };
  }, []);

  const onChangeHandler = event => {
    setSearchFilter({
      ...searchFilter,
      [`${event.target.name}`]: event.target.value
    });
  };

  const searchingEventsWithFilter = () => {
    if (searchFilter.name.length > 0 || (searchFilter.startDate.length > 0 && searchFilter.endDate.length > 0)) {
      console.log("searching by ...");
      console.log(`name=${searchFilter.name}/startDate=${searchFilter.startDate}/endDate=${searchFilter.endDate}`)
    }
  }
  return (
    <div className="all-user-container">
      <div className="search-filters">
        <TextInput
          onChange={onChangeHandler}
          placeholder="start date"
          type="date"
          name="startDate"
          value={searchFilter.startDate}
          classes="input-blue text-input-extra date"
        />
        <TextInput
          onChange={onChangeHandler}
          placeholder="end date"
          type="date"
          name="endDate"
          value={searchFilter.endDate}
          classes="input-blue text-input-extra date"
        />
        <TextInput
          onChange={onChangeHandler}
          placeholder="name"
          type="text"
          name="name"
          value={searchFilter.name}
          classes="input-blue search-bar"
        />
        <Button clicked={searchingEventsWithFilter} classes="form-btn btn-blueGradient btn-sm search-btn">Search </Button>
      </div>
      <PaginatedContainer
        title="All Events"
        perPage={10}
        items={publicEventsList.events}
        render={
          publicEventsList.spinner
            ? () => <Spinner />
            : ({ items }) =>
              items.map(ev => (
                <EventCard
                  id={ev.event_id}
                  key={ev.event_id}
                  name={ev.name}
                  date={ev.startDate}
                  location={ev.address}
                  eventState={ev.isComplete}
                />
              ))} />

    </div>
  );
};

export default EventLayout;
