import React from 'react';
import './EventCard.scss';

const eventCard = (props) => {
    return(
        <div className="Event-Card">
            <div className="eventIcon">
                <i class="fas fa-glass-cheers"></i>
            </div>
            <div className="content">
                <h2>Ny party</h2>
                <span>
                    <i class="fas fa-calendar-alt"></i>
                    10-10-2020
                </span>
                <span>
                    <i class="fas fa-map-marker-alt"></i>
                    Locaion, Location
                </span>
            </div>
            <i class="fas fa-arrow-circle-right"></i>
        </div>
    );
}
export default eventCard;