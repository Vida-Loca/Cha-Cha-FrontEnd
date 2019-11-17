import React, {useContext} from 'react';
import {FormContext} from '../../context/FormContext';
import Button from '../../components/button/Button';
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';
import EventCard from '../../components/EventCard/EventCard';
import './Profile.scss';

const Profile = (props) =>{
    const [movie, setmovie] = useContext(FormContext)


    const insideProfile = () => {
        setmovie( {name: ProfileForm()})
        props.openModal();
    }

    const ProfileForm= () => {
        return(
            <Form>
                <Input icon="fas fa-user" type="text" placeholder="name" />
                <Input icon="fas fa-key" type="password" placeholder="surname" />
                <Input icon="fas fa-key" type="password" placeholder="email" />
                <Input icon="fas fa-key" type="password" placeholder="password" />
                <Button to="/home" classes="btn-blueGradient btn-md">update</Button>
            </Form>
        );
    }

    return( 
        <div className="profileRootContainer">
            <div>
                <img src="https://image.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg" alt=""/>
                <div className="information">
                    <span className="username">@Heylee</span>
                    <Button clicked={insideProfile} classes="btn-sm btn-blueGradient">Edit Profile</Button>
                    <div className="icon-span">
                        <i class="fas fa-calendar-alt"></i>
                        <span>joined 10-12-2009</span>
                    </div>
                    <div className="icon-span">
                        <i class="fas fa-users"></i>
                        <span>Friends 20</span>
                    </div>
    
                </div>
            </div>
            <div>
            <h2>My Events</h2>
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
            </div>
        </div>
    );
}

export default Profile;