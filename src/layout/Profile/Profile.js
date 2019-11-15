import React from 'react';
import Button from '../../components/button/Button';
import EventCard from '../../components/EventCard/EventCard';
import './Profile.scss';

const Profile = () =>{
    return( 
        <div className="profileRootContainer">
            <div>
                <img src="https://image.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg" alt=""/>
                <div className="information">
                    <span className="username">@Heylee</span>
                    <Button classes="btn-sm btn-blueGradient">Edit Profile</Button>
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