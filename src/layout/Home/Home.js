import React, { useContext, useState, useEffect } from "react";
import { FormContext } from "../../context/FormContext";

// import { events } from "../../mockData";
import { eventService } from "../../Authentication/service";

import "./Home.scss";
import CreateEventContainer from "./CreateEventContainer";
import SearchFriends from "./FriendsSearch";

import { Button } from "../../components/Button";
import EventCard from "../../components/EventCard";
import PaginatedContainer from "../../components/PaginatedContainer";
import Spinner from "../../components/Spinner";
import MapBox from "../../components/Map";

const Home = () => {
  const [publicEventsList, setPublicEventsList] = useState({ events: [], spinner: true });
  const [friendsEventsList, setFriendsEventsList] = useState({ events: [], spinner: true });
  const [publicEventMarkers, setPublicEventMarkers] = useState({ markers: [], loaded: false });

  useEffect(() => {
    let __isMounted = true;

    eventService.getAllPublicEvents()
      .then(res => {
        if (__isMounted) {
          setPublicEventsList({ events: res, spinner: false });
          const markers = res.map(event => {
            if(event.address.longitude !== null && event.address.latitude !== null){
              return({lat: event.address.latitude, long: event.address.longitude})
            }
          }).filter(el => el !== undefined);
          setPublicEventMarkers({markers: markers, loaded: true });
        }
      }).catch(_ =>{
        if (__isMounted) {
        setPublicEventsList({ ...publicEventsList, spinner: false });
        }
      })

    eventService.getAllEvents()
      .then(res => {
        if (__isMounted) {
          setFriendsEventsList({ events: res, spinner: false });
        }
      }).catch(_ =>{
        if (__isMounted) {
          setFriendsEventsList({ ...friendsEventsList, spinner: false });
        }
      })
    return () => {
      __isMounted = false;
    };
  }, []);

  const [, setform] = useContext(FormContext);
  const createNewEventModal = () => {
    setform({ show: true, renderForm: <CreateEventContainer /> });
  };
  const friendSearchModal = () => {
    setform({ show: true, renderForm: <SearchFriends /> });
  };

  return (
    <div className="home-container">
      <div className="buttons-container">
        <Button clicked={createNewEventModal} classes="btn-md btn-blueGradient">+ Create Event</Button>
        <Button clicked={friendSearchModal} classes="btn-md btn-orangeGradient">Look for friends</Button>
      </div>

      <div className="dashboard">

        <PaginatedContainer
          title={<span><i className="fas fa-door-open" /> {`Public Events`}</span>}
          items={publicEventsList.events}
          noContentMsg="there are no public events at the moment"
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
                    eventState={ev.over ? "finished" : "ongoing"}
                    listIndex={index % 5}
                  />
                ))
          }
        />
        <PaginatedContainer
          title={<span><i className="fas fa-users" /> {`Friend's Events`}</span>}
          items={friendsEventsList.events}
          noContentMsg="none of your friends are hosting events at the moment"
          render={
            friendsEventsList.spinner
              ? () => <Spinner />
              : ({ items }) =>
                items.map((ev, index) => (
                  <EventCard
                    id={ev.id}
                    key={ev.id}
                    name={ev.name}
                    date={ev.startTime}
                    location={ev.address}
                    eventState={ev.over ? "finished" : "ongoing"}
                    listIndex={index % 5}
                  />
                ))
          }
        />
        <div className="map-cont">
          {
            (publicEventMarkers.loaded && publicEventMarkers.markers.lnegth > 0) &&
            <MapBox 
              latitude={publicEventMarkers.markers[0].lat} longitude={publicEventMarkers.markers[0].long} 
              markers={publicEventMarkers.markers} 
            />
          }
        </div>
      </div>
      
    </div>
  );
};

export default Home;
