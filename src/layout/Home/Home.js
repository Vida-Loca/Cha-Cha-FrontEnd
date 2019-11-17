import React, {Component, useState, useContext} from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';
import EventCard from '../../components/EventCard/EventCard';
import {FormContext} from '../../context/FormContext';
import {Link} from 'react-router-dom';
import './Home.scss';

const HomeLayout = (props) => {
        const [movie, setmovie] = useContext(FormContext)


        const insideHome = () => {
            setmovie( {name: newEventForm()})
            props.openModal();
        }

        const saysom = () => {
            console.log(movie.name)
        };

        const newEventForm= () => {
            return(
                <Form>
                    <Input icon="fas fa-user" type="text" placeholder="name" />
                    <Input icon="fas fa-key" type="password" placeholder="location" />
                    <Input icon="fas fa-key" type="password" placeholder="date" />
                    <Input icon="fas fa-key" type="password" placeholder="time" />
                    <Button to="/home" classes="btn-blueGradient btn-md">apply</Button>
                </Form>
            );
        }


        return (
            <div className="HomeLayout">
                <Link to="/">
                    <Button clicked={insideHome} classes="btn-md btn-blueGradient">+ Create Event</Button>
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

export default HomeLayout;