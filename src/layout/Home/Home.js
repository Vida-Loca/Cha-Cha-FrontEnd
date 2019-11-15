import React, {Component} from 'react';
import Button from '../../components/button/Button';
import EventCard from '../../components/EventCard/EventCard';
import {Link} from 'react-router-dom';
import './Home.scss';

class HomeLayout extends Component {


    render() {
        return (
            <div className="HomeLayout">

                <Link to="/">
                    <Button classes="btn-md btn-blueGradient">+ Create Event</Button>
                </Link>
                <div>
                    <h2>Public Events</h2>
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>
            </div>
        );
    }
}

export default HomeLayout;